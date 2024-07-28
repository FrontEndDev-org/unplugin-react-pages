import { createUnplugin } from 'unplugin';
import { pkgName } from './const';
import { ReactPages } from './core/ReactPages';
import { type DeepPartial, withDefaults } from './helpers';
import type { PluginOptions } from './plugin';

export type UserPluginOptions = DeepPartial<PluginOptions>;

// @ref https://cn.vitejs.dev/guide/api-plugin#virtual-modules-convention
const virtualModuleId = 'virtual:react-pages';
const resolvedVirtualModuleId = `\0${virtualModuleId}`;

const defaultPluginOptions: () => PluginOptions = () => ({
  debug: false,
  pagesDir: 'src/pages',
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

export const reactPages = createUnplugin<UserPluginOptions>((options) => {
  let reactPages: ReactPages | null = null;

  return {
    name: pkgName,
    enforce: 'pre',

    buildStart() {
      reactPages = new ReactPages(process.cwd(), withDefaults(defaultPluginOptions(), options));
    },

    buildEnd() {
      reactPages?.teardown();
    },

    resolveId(id) {
      if (id !== virtualModuleId) return;

      return resolvedVirtualModuleId;
    },

    loadInclude(id) {
      return id === resolvedVirtualModuleId;
    },

    async load(id) {
      if (id !== resolvedVirtualModuleId) return;

      return reactPages?.generate();
    },
  };
});
