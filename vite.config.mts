/**
 * @file vite.config.mts
 * @ref https://vitejs.dev/
 * vitest config
 * @ref https://vitest.dev/
 */

import { externalizeDeps } from 'vite-plugin-externalize-deps';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';
import pkg from './package.json';

export default defineConfig({
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
    ['process.env.PKG_NAME']: JSON.stringify(pkg.name),
    ['process.env.PKG_VERSION']: JSON.stringify(pkg.version),
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
    env: {
      NODE_ENV: 'test',
      PKG_NAME: 'pkg-name-for-test',
      PKG_VERSION: 'pkg-version-for-test',
    },
    coverage: {
      all: true,
      include: ['src/**/*.ts'],
      reporter: ['lcov', 'text'],
    },
  },
});
