import type { LogLevel, ModuleNode, Plugin } from 'vite';
import { pkgName } from './const';
import { ReactApp } from './core/ReactApp';
import { type DeepPartial, withDefaults } from './helpers';
import type { FileType } from './core/FSTree';

export interface PluginOptions {
  /**
   * 是否开启调试模式
   */
  debug: boolean;

  /**
   * 应用目录
   * @default 'src/pages'
   */
  appDir: string;

  /**
   * 文件名映射
   */
  fileNames: Record<FileType, string | string[]>;

  /**
   * 日志等级
   */
  logLevel: LogLevel;

  /**
   * 是否禁用懒加载
   */
  disableLazy: boolean;

  /**
   * 是否区分大小写
   */
  caseSensitive: boolean;

  /**
   * 排除文件，默认排除 node_modules
   */
  excludes: string[];
}

export type UserPluginOptions = DeepPartial<PluginOptions>;

// @ref https://cn.vitejs.dev/guide/api-plugin#virtual-modules-convention
const virtualModuleId = 'virtual:react-app';
const resolvedVirtualModuleId = `\0${virtualModuleId}`;

const defaultPluginOptions: () => PluginOptions = () => ({
  debug: false,
  appDir: 'src/pages',
  logLevel: 'error',
  disableLazy: false,
  caseSensitive: false,
  fileNames: {
    page: ['page.jsx', 'page.tsx'],
    action: ['action.jsx', 'action.tsx'],
    layout: ['layout.jsx', 'layout.tsx'],
    error: ['error.jsx', 'error.tsx'],
    loading: ['loading.jsx', 'loading.tsx'],
    loader: ['loader.jsx', 'loader.tsx'],
    'not-found': ['not-found.jsx', 'not-found.tsx'],
  },
  excludes: ['**/node_modules/**'],
});

export function reactApp(userPluginOptions?: UserPluginOptions): Plugin {
  let reactApp: ReactApp | null = null;

  return {
    name: pkgName,
    enforce: 'pre',

    async configResolved(config) {
      reactApp = new ReactApp(withDefaults(defaultPluginOptions(), userPluginOptions), config);
    },

    async configureServer(server) {
      await reactApp?.connect(server, function () {
        this.logger.info(`react-app is changed`);

        const { moduleGraph } = server;
        const mods = moduleGraph.getModulesByFile(resolvedVirtualModuleId);

        if (mods) {
          const seen = new Set<ModuleNode>();
          mods.forEach((mod) => {
            moduleGraph.invalidateModule(mod, seen);
          });
        }

        server.ws.send({
          type: 'full-reload',
        });
      });
    },

    resolveId(id) {
      if (id !== virtualModuleId) return;

      return resolvedVirtualModuleId;
    },

    async load(id) {
      if (id !== resolvedVirtualModuleId) return;

      return reactApp?.output;
    },
  };
}
