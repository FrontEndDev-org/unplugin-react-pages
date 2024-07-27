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
import { reactPages } from '../src';

export default defineConfig({
  server: {
    port: 15170,
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
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
    reactPages({
      debug: true,
      logLevel: 'info',
      fileNames: {
        page: ['page.mdx', 'page.tsx'],
      },
    }),
  ],
});
