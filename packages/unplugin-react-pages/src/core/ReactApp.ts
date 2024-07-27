import nodeFS from 'node:fs';
import nodePath from 'node:path';
import { glob } from 'glob';
import { type Logger, type ResolvedConfig, type ViteDevServer, createLogger, normalizePath } from 'vite';
import { pkgName } from '../const';
import { ensureArray } from '../helpers';
import type { PluginOptions } from '../plugin';
import { FSTree } from './FSTree';

export type ReactAppChange = (this: ReactApp) => unknown;
export class ReactApp {
  logger: Logger;
  fsTree: FSTree;
  absApp: string;

  constructor(
    readonly options: PluginOptions,
    readonly config: ResolvedConfig,
  ) {
    this.logger = createLogger(options.logLevel, { prefix: `[${pkgName}]` });
    this.logger.info(`new Options: ${JSON.stringify(options)}`);
    this.absApp = nodePath.join(this.config.root, options.appDir);
    this.fsTree = new FSTree({
      cwd: nodePath.join('/', options.appDir),
      logger: this.logger,
      resolveFileName: (page, fileType) => {
        const fileNames = ensureArray(this.options.fileNames[fileType]);
        if (fileNames.length === 0)
          return;

        return fileNames.find((fileName) => {
          const absFile = nodePath.join(this.absApp, page.dirName, fileName);
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

  get output() {
    const output = this.fsTree.render();
    this.logger.info(`Generated: ${output}`);
    return output;
  }

  private _inApp(path: string) {
    return path.startsWith(this.absApp);
  }

  private devServer?: ViteDevServer;
  private onChange?: () => unknown;
  async connect(devServer: ViteDevServer, onChange: ReactAppChange) {
    this.devServer = devServer;
    this.onChange = onChange;
    this.logger.info(`setup`);

    devServer.watcher.on('unlink', async (path) => {
      if (!this._inApp(path))
        return;

      await this.removeFile(path);
    });

    devServer.watcher.on('add', async (path) => {
      if (!this._inApp(path))
        return;

      await this.addFile(path);
    });

    devServer.watcher.on('change', async (path) => {
      if (!this._inApp(path))
        return;

      await this.updateFile(path);
    });

    await this.setup();
  }

  async setup() {
    this.logger.info(`setup`);

    const pageFileNames = ensureArray(this.options.fileNames.page);

    if (pageFileNames.length > 0) {
      const pageFiles = await glob(
        nodePath.join('**', pageFileNames.length > 1 ? `{${pageFileNames.join(',')}}` : pageFileNames[0]),
        {
          cwd: this.absApp,
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
