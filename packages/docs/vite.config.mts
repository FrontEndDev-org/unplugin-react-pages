import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import path from 'path';
import rehypeHighlight from 'rehype-highlight';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { reactApp } from '../vite-plugin-react-app/src';

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
                [rehypeHighlight, {
                    detect: true,
                } as Parameters<typeof rehypeHighlight>[0]]
            ]
        }),
        UnoCSS(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve('src/icons')],
            symbolId: 'icon-[dir]/[name]',
        }),
        reactApp({
            debug: true,
            logLevel: 'info',
            fileNames: {
                page: ['page.mdx', 'page.tsx'],
            }
        }),
    ],
});
