import nodeFS from 'node:fs';
import nodePath from 'node:path';
import { glob } from 'glob';
import { type Logger, type ViteDevServer, createLogger, normalizePath } from 'vite';
import { pkgName } from '../const';
import { ensureArray } from '../helpers';
import type { PluginOptions } from '../plugin';
import { FSTree } from './FSTree';

export type ReactPagesChange = (this: ReactPages) => unknown;
export class ReactPages {
  logger: Logger;
  fsTree: FSTree;
  absPagesDir: string;

  constructor(
    readonly cwd: string,
    readonly options: PluginOptions,
  ) {
    this.logger = createLogger(options.logLevel, { prefix: `[${pkgName}]` });
    this.logger.info(`new Options: ${JSON.stringify(options)}`);
    this.absPagesDir = nodePath.join(this.cwd, options.pagesDir);
    this.fsTree = new FSTree({
      cwd: nodePath.join('/', options.pagesDir),
      logger: this.logger,
      resolveFileName: (page, fileType) => {
        const fileNames = ensureArray(this.options.fileNames[fileType]);
        if (fileNames.length === 0)
          return;

        return fileNames.find((fileName) => {
          const absFile = nodePath.join(this.absPagesDir, page.dirName, fileName);
          return nodeFS.existsSync(absFile) && nodeFS.statSync(absFile).isFile();
        });
      },
      resolveDuplicate: (fsNode, duplicatePages) => {
        const fileNames = ensureArray(this.options.fileNames.page);
        if (fileNames.length === 0)
          return;

        for (let i = 0; i < fileNames.length; i++) {
          if (duplicatePages.includes(fileNames[i]))
            return i;
        }
      },
    });
  }

  async generate() {
    if (!this.isSetup) {
      this.logger.info(`is not setup, try to setup again`);
      await this.setup();
    }

    const output = this.fsTree.render();
    this.logger.info(`Generated: ${output}`);
    return output;
  }

  private _inPagesDir(path: string) {
    return path.startsWith(this.absPagesDir);
  }

  private devServer?: ViteDevServer;
  private onChange?: () => unknown;
  async watch(devServer: ViteDevServer, onChange: ReactPagesChange) {
    this.devServer = devServer;
    this.onChange = onChange;
    this.logger.info(`setup`);

    devServer.watcher.on('unlink', async (path) => {
      if (!this._inPagesDir(path))
        return;

      await this.removeFile(path);
    });

    devServer.watcher.on('add', async (path) => {
      if (!this._inPagesDir(path))
        return;

      await this.addFile(path);
    });

    devServer.watcher.on('change', async (path) => {
      if (!this._inPagesDir(path))
        return;

      await this.updateFile(path);
    });

    await this.setup();
  }

  private _isSetup = false;
  get isSetup() {
    return this._isSetup;
  }

  async setup() {
    if (this.isSetup) {
      this.logger.error(`is already setup`);
      return;
    }

    this.logger.info(`setup react pages ${this.absPagesDir}`);

    const pageFileNames = ensureArray(this.options.fileNames.page);

    if (pageFileNames.length > 0) {
      const pageFiles = await glob(
        nodePath.join('**', pageFileNames.length > 1 ? `{${pageFileNames.join(',')}}` : pageFileNames[0]),
        {
          cwd: this.absPagesDir,
          nodir: true,
          dot: false,
          ignore: this.options.excludes,
        },
      );
      const pageFiles2 = pageFiles.map(normalizePath);
      // .sort((a, b) => a.split(nodePath.sep).length - b.split(nodePath.sep).length);
      this.logger.info(`Page files: ${JSON.stringify(pageFiles2)}`);
      this.fsTree.mount(pageFiles2);
    }
    else {
      this.logger.error(`No page file name specified`);
    }
  }

  teardown() {
    this.logger.info(`teardown`);
    this._isSetup = false;
  }

  async addFile(file: string) {
    this.logger.info(`Add file: ${file}`);
    // TODO 临时
    await this.setup();
    this.onChange?.();
  }

  async updateFile(file: string) {
    this.logger.info(`Update file: ${file}`);
  }

  async removeFile(file: string) {
    this.logger.info(`Remove file: ${file}`);
    // TODO 临时
    await this.setup();
    this.onChange?.();
  }
}
