import nodePath from 'node:path';
import type { Logger } from 'vite';
import { isNumber } from 'lodash-es';
import { FSRouter } from './FSRouter';

export interface PageMeta {
  pageFileName: string;
  depth: number;
  group?: string;
  dirName: string;
  pathName: string;
}

export type FileType = 'page' | 'layout' | 'loader' | 'action' | 'error' | 'loading' | 'not-found';

export class FSNode {
  id: number;

  /**
   * 分组
   */
  group?: string;

  /**
   * 深度，起始为 0
   */
  depth: number;
  /**
   * 【唯一】所在目录，相对于 cwd
   */
  dirName: string;
  /**
   * 路径名
   */
  pathName: string;
  /**
   * 页面，未声明页面时为空字符串
   * @ref https://reactrouter.com/en/main/route/route#elementcomponent
   */
  pageFileName: string;
  /**
   * https://reactrouter.com/en/main/start/concepts#layout-routes
   */
  layoutFileName?: string;
  /**
   * @ref https://reactrouter.com/en/main/route/loader
   */
  loaderFileName?: string;
  /**
   * @ref https://reactrouter.com/en/main/route/action
   */
  actionFileName?: string;
  /**
   * @ref https://reactrouter.com/en/main/route/error-element
   */
  errorFileName?: string;
  /**
   * @ref https://react.dev/reference/react/Suspense
   */
  loadingFileName?: string;
  /**
   * @ref https://reactrouter.com/en/main/start/faq#how-do-i-add-a-no-match-404-route-in-react-router-v6
   */
  notFoundFileName?: string;

  children: FSNode[] = [];
  parent?: FSNode;

  constructor(
    readonly tree: FSTree,
    pageMeta: PageMeta,
  ) {
    const { pageFileName, depth, group, dirName, pathName } = pageMeta;

    this.id = this.tree.nextId();

    this.pageFileName = pageFileName;
    this.depth = depth;
    this.group = group;
    this.dirName = dirName;
    this.pathName = pathName;

    this.layoutFileName = this._resolveFileName('layout');
    this.loaderFileName = this._resolveFileName('loader');
    this.actionFileName = this._resolveFileName('action');
    this.errorFileName = this._resolveFileName('error');
    this.loadingFileName = this._resolveFileName('loading');
    this.notFoundFileName = this._resolveFileName('not-found');

    this.tree.dirMap.set(dirName, this);

    if (this.pageFileName) {
      this.tree.fsRouter.addPageNode(this);
    }

    if (this.layoutFileName) {
      this.tree.fsRouter.addLayoutNode(this);
    }

    if (depth === 0) {
      this.tree.root = this;
    }

    this._linking();
  }

  update(meta: PageMeta) {
    Object.assign(this, meta);
  }

  get path() {
    return this.pathName === '.'
      ? ''
      : this.pathName.startsWith('[') && this.pathName.endsWith(']')
        ? `:${this.pathName.slice(1, -1)}`
        : this.pathName.startsWith('(') && this.pathName.endsWith(')')
          ? this.pathName.slice(1, -1)
          : this.pathName;
  }

  get pageFile() {
    return nodePath.join(this.tree.cwd, this.dirName, this.pageFileName);
  }

  private _resolveFileName(fileType: FileType) {
    return this.tree.options.resolveFileName(this, fileType);
  }

  private _resolveFile(fileName?: string) {
    return fileName && nodePath.join(this.tree.cwd, this.dirName, fileName);
  }

  get layoutFile() {
    return this._resolveFile(this.layoutFileName);
  }

  get actionFile() {
    return this._resolveFile(this.actionFileName);
  }

  get loaderFile() {
    return this._resolveFile(this.loaderFileName);
  }

  get errorFile() {
    return this._resolveFile(this.errorFileName);
  }

  get loadingFile() {
    return this._resolveFile(this.loadingFileName);
  }

  get notFoundFile() {
    return this._resolveFile(this.notFoundFileName);
  }

  private _linking() {
    const { depth, dirName: dir } = this;
    const parentDepth = depth - 1;
    const parentDir = nodePath.dirname(dir);
    const parentName = nodePath.basename(parentDir);
    const parentGroup = depth > 0 ? this.group : undefined;

    if (depth < 1)
      return;

    const parent = this.tree.dirMap.get(parentDir);

    if (parent) {
      this.parent = parent;
      parent.children.push(this);
    }
    else {
      const newParent = new FSNode(this.tree, {
        pageFileName: '',
        depth: parentDepth,
        dirName: parentDir,
        pathName: parentName,
        group: parentGroup,
      });

      this.parent = newParent;
      newParent.children.push(this);
    }
  }

  static parse(pageFile: string): PageMeta {
    const segments = pageFile.split('/');
    // 去除末尾 page.tsx
    // path/to/page.tsx -> [path, to, page.tsx]
    // -> [path, to]
    const pageFileName = segments.pop()!;
    const depth = segments.length;
    const pathName = segments.at(-1) || '.';
    const dirName = segments.join('/') || '.';
    const firstSeg = segments.at(0);
    const group
      = depth > 0 && firstSeg?.startsWith('(') && firstSeg?.endsWith(')') ? firstSeg?.slice(1, -1) : undefined;
    return { pageFileName, depth, dirName, pathName, group };
  }

  static create(tree: FSTree, meta: PageMeta) {
    return new FSNode(tree, meta);
  }
}

export interface FSTreeOptions {
  cwd: string;
  logger: Logger;
  resolveFileName: (fsNode: FSNode, fileType: FileType) => string | undefined;
  resolveDuplicate: (fsNode: FSNode, duplicatePages: string[]) => number | undefined;
}

export class FSTree {
  root?: FSNode;
  dirMap = new Map<string, FSNode>();
  fsRouter = new FSRouter(this);

  constructor(readonly options: FSTreeOptions) {}

  get cwd() {
    return this.options.cwd;
  }

  get logger() {
    return this.options.logger;
  }

  mount(pages: string[]) {
    if (this.dirMap.size) {
      this.logger.info(`prepare to mount pages...`);
      this.root = undefined;
      this.dirMap.clear();
      this.fsRouter = new FSRouter(this);
    }

    this.logger.info(`mount pages: ${JSON.stringify(pages)}`);
    pages.forEach((page) => {
      const meta = FSNode.parse(page);
      const fsNode = this.dirMap.get(meta.dirName);

      if (fsNode) {
        if (fsNode.pageFileName) {
          this.logger.info(`fsNode page already exists [${fsNode.pageFileName}, ${meta.pageFileName}]`);
          const chooseIndex = this.options.resolveDuplicate(fsNode, [fsNode.pageFileName, meta.pageFileName]);
          this.logger.info(`choose index: ${chooseIndex}`);

          if (isNumber(chooseIndex) && chooseIndex > -1) {
            fsNode.update(meta);
          }
        }
        else {
          fsNode.update(meta);
        }
      }
      else {
        FSNode.create(this, meta);
      }
    });
    this.logger.info(`build router`);
    this.fsRouter.build();
  }

  // // TODO
  // addFileByType(fileType: FileType, fileName: string) {
  //     this.logger.info(`add file type: ${fileType} -> ${fileName}`);
  // }

  // // TODO
  // removeFileByType(fileType: FileType, fileName: string) {
  //     this.logger.info(`remove file type: ${fileType}`);
  // }

  render(tabSize = 4) {
    return this.fsRouter.render(tabSize);
  }

  private _id = 0;
  nextId() {
    return this._id++;
  }

  static makeLayoutComponentName(id: number) {
    return `Layout_${id}`;
  }

  static makePageComponentName(id: number) {
    return `Page_${id}`;
  }
}
