import { externalizeDeps } from 'vite-plugin-externalize-deps';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';
import pkg from './package.json';

/**
 * vite config
 * @ref https://vitejs.dev/
 * vitest config
 * @ref https://vitest.dev/
 */
export default defineConfig((config) => {
  return {
    plugins: [
      externalizeDeps({
        deps: true,
        devDeps: true,
        peerDeps: true,
        optionalDeps: true,
        nodeBuiltins: true,
      }),
      dts({
        include: 'src',
      }),
    ],
    define: {
      PKG_NAME: JSON.stringify(config.mode === 'test' ? 'pkg-name-for-test' : pkg.name),
      PKG_VERSION: JSON.stringify(config.mode === 'test' ? 'pkg-version-for-test' : pkg.version),
    },
    build: {
      minify: false,
      sourcemap: true,
      copyPublicDir: false,
      reportCompressedSize: false,
      lib: {
        entry: {
          index: 'src/index.ts',
        },
      },
      rollupOptions: {
        output: [
          {
            format: 'esm',
            entryFileNames: '[name].mjs',
            chunkFileNames: '[name].mjs',
          },
          {
            format: 'cjs',
            entryFileNames: '[name].cjs',
            chunkFileNames: '[name].cjs',
          },
        ],
      },
    },
    // optimizeDeps: {
    //   exclude: ['fsevents'],
    // },
    test: {
      globals: true,
      coverage: {
        all: true,
        include: ['src/**/*.ts'],
        reporter: ['lcov', 'text'],
      },
    },
  };
});
