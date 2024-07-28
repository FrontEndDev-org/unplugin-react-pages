/**
 * vite.confifg.mts
 * @ref https://vitejs.dev/
 */

import path from 'node:path';
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import rehypeHighlight from 'rehype-highlight';
import uno from 'unocss/vite';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { reactPages } from 'unplugin-react-pages';
import pkg from './package.json';

export default defineConfig((config) => {
  return {
    base: process.env.VITE_APP_BASENAME || '/',
    server: {
      port: 15170,
    },
    define: {
      PKG_NAME: JSON.stringify(config.mode === 'test' ? 'pkg-name-for-test' : pkg.name),
      PKG_VERSION: JSON.stringify(config.mode === 'test' ? 'pkg-version-for-test' : pkg.version),
    },
    plugins: [
      // plugins
      react(),
      mdx({
        rehypePlugins: [
          //
          [
            rehypeHighlight,
            {
              detect: true,
            } as Parameters<typeof rehypeHighlight>[0],
          ],
        ],
      }),
      uno(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve('src/icons')],
        symbolId: 'icon-[dir]/[name]',
      }),
      ViteMinifyPlugin({
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      }),
      reactPages.vite({
        debug: true,
        logLevel: 'info',
        fileNames: {
          page: ['page.mdx', 'page.tsx'],
        },
      }),
    ],
  };
});
