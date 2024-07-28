import { createLogger } from 'vite';
import { FSTree } from '../src/core/FSTree';

it('empty', () => {
  const tree = new FSTree({
    cwd: '/',
    logger: createLogger(),
    resolveFileName: () => undefined,
    resolveDuplicate: () => undefined,
  });

  tree.mount([]);

  expect(tree.dirMap.size).toBe(0);
  expect(tree.root).toBeUndefined();

  expect(tree.render(4)).toMatchInlineSnapshot(`
    "/**
     * generated by pkg-name-for-test@pkg-version-for-test
     * @ref https://github.com/FrontEndDev-org/unplugin-react-pages
     * @ref https://react.dev
     * @ref https://reactrouter.com
     */

    import { Suspense, lazy, createElement } from "react";
    import { Outlet } from "react-router-dom";

    // pages

    // layouts

    export const routes = [
    ];
    "
  `);
});

it('首页', () => {
  const tree = new FSTree({
    cwd: '/',
    logger: createLogger(),
    resolveFileName: () => undefined,
    resolveDuplicate: () => undefined,
  });
  tree.mount([
    // pages
    'page.tsx',
  ]);

  expect(tree.dirMap.size).toEqual(1);
  expect(tree.root).not.toBeUndefined();
  expect(tree.root?.pageFileName).not.toBeUndefined();
  expect(tree.root?.children).toHaveLength(0);

  expect(tree.render(4)).toMatchInlineSnapshot(`
    "/**
     * generated by pkg-name-for-test@pkg-version-for-test
     * @ref https://github.com/FrontEndDev-org/unplugin-react-pages
     * @ref https://react.dev
     * @ref https://reactrouter.com
     */

    import { Suspense, lazy, createElement } from "react";
    import { Outlet } from "react-router-dom";

    // pages
    const Page_0 = lazy(() => import("/page.tsx"));

    // layouts

    export const routes = [
    {
        path: "",
        element: createElement(Suspense, {}, createElement(Page_0, null)),
    },
    ];
    "
  `);
});

it('独立深度页面', () => {
  const tree = new FSTree({
    cwd: '/',
    logger: createLogger(),
    resolveFileName: () => undefined,
    resolveDuplicate: () => undefined,
  });
  tree.mount([
    // pages
    'users/[username]/page.tsx',
  ]);

  expect(tree.dirMap.size).toEqual(3);
  // /
  expect(tree.root).not.toBeUndefined();
  expect(tree.root?.pageFileName).toEqual('');
  // /users
  expect(tree.root?.children).toHaveLength(1);
  // /users/[username]
  expect(tree.root?.children[0].children).toHaveLength(1);

  expect(tree.render(4)).toMatchInlineSnapshot(`
    "/**
     * generated by pkg-name-for-test@pkg-version-for-test
     * @ref https://github.com/FrontEndDev-org/unplugin-react-pages
     * @ref https://react.dev
     * @ref https://reactrouter.com
     */

    import { Suspense, lazy, createElement } from "react";
    import { Outlet } from "react-router-dom";

    // pages
    const Page_0 = lazy(() => import("/users/[username]/page.tsx"));

    // layouts

    export const routes = [
    {
        path: "users/:username",
        element: createElement(Suspense, {}, createElement(Page_0, null)),
    },
    ];
    "
  `);
});

it('两个不连续的页面', () => {
  const tree = new FSTree({
    cwd: '/',
    logger: createLogger(),
    resolveFileName: () => undefined,
    resolveDuplicate: () => undefined,
  });
  tree.mount([
    // pages
    'page.tsx',
    'users/[username]/page.tsx',
  ]);

  expect(tree.dirMap.size).toEqual(3);
  // /
  expect(tree.root).not.toBeUndefined();
  expect(tree.root?.pageFileName).toEqual('page.tsx');
  // /users
  expect(tree.root?.children).toHaveLength(1);
  // /users/[username]
  expect(tree.root?.children[0].children).toHaveLength(1);

  expect(tree.render(4)).toMatchInlineSnapshot(`
    "/**
     * generated by pkg-name-for-test@pkg-version-for-test
     * @ref https://github.com/FrontEndDev-org/unplugin-react-pages
     * @ref https://react.dev
     * @ref https://reactrouter.com
     */

    import { Suspense, lazy, createElement } from "react";
    import { Outlet } from "react-router-dom";

    // pages
    const Page_0 = lazy(() => import("/page.tsx"));
    const Page_1 = lazy(() => import("/users/[username]/page.tsx"));

    // layouts

    export const routes = [
    {
        path: "",
        element: createElement(Suspense, {}, createElement(Page_0, null)),
    },
    {
        path: "users/:username",
        element: createElement(Suspense, {}, createElement(Page_1, null)),
    },
    ];
    "
  `);
});

it('半连续页面', () => {
  const tree = new FSTree({
    cwd: '/',
    logger: createLogger(),
    resolveFileName: () => undefined,
    resolveDuplicate: () => undefined,
  });
  tree.mount([
    // pages
    'page.tsx',
    'users/[username]/page.tsx',
    'users/pages/[pageNo]/page.tsx',
  ]);

  expect(tree.dirMap.size).toEqual(5);
  // /
  expect(tree.root).not.toBeUndefined();
  expect(tree.root?.pageFileName).toEqual('page.tsx');
  // /users
  expect(tree.root?.children).toHaveLength(1);
  // /users/[username]
  // /users/pages
  expect(tree.root?.children[0].children).toHaveLength(2);
  // /users/pages/[pageNo]

  expect(tree.render(4)).toMatchInlineSnapshot(`
    "/**
     * generated by pkg-name-for-test@pkg-version-for-test
     * @ref https://github.com/FrontEndDev-org/unplugin-react-pages
     * @ref https://react.dev
     * @ref https://reactrouter.com
     */

    import { Suspense, lazy, createElement } from "react";
    import { Outlet } from "react-router-dom";

    // pages
    const Page_0 = lazy(() => import("/page.tsx"));
    const Page_1 = lazy(() => import("/users/[username]/page.tsx"));
    const Page_3 = lazy(() => import("/users/pages/[pageNo]/page.tsx"));

    // layouts

    export const routes = [
    {
        path: "",
        element: createElement(Suspense, {}, createElement(Page_0, null)),
    },
    {
        path: "users/:username",
        element: createElement(Suspense, {}, createElement(Page_1, null)),
    },
    {
        path: "users/pages/:pageNo",
        element: createElement(Suspense, {}, createElement(Page_3, null)),
    },
    ];
    "
  `);
});

it('分组', () => {
  const tree = new FSTree({
    cwd: '/',
    logger: createLogger(),
    resolveFileName: () => undefined,
    resolveDuplicate: () => undefined,
  });
  tree.mount([
    // pages
    'page.tsx',
    'users/[username]/page.tsx',
    'users/pages/[pageNo]/page.tsx',
    '(books)/[bookId]/page.tsx',
    '(books)/[bookId]/author/page.tsx',
    '(books)/[bookId]/chapters/[chapterId]/page.tsx',
    '(books)/[bookId]/chapters/highlight/page.tsx',
  ]);

  expect(tree.dirMap.size).toEqual(11);

  // /
  expect(tree.root).not.toBeUndefined();
  expect(tree.root?.pageFileName).toEqual('page.tsx');
  expect(tree.root?.pageFile).toEqual('/page.tsx');

  // /users
  expect(tree.root?.children).toHaveLength(2);
  // console.log(tree.root?.children);
  const usersFSPage = tree.root?.children.find((p) => p.pathName === 'users');
  expect(usersFSPage).not.toBeUndefined();
  // /users/[username]
  // /users/pages
  expect(usersFSPage?.children).toHaveLength(2);
  // /users/pages/[pageNo]

  // /(books)
  const books = tree.root?.children.find((p) => p.pathName === '(books)');
  expect(books?.group).toEqual('books');
  expect(books).not.toBeUndefined();

  // /(books)/[bookId]
  expect(books?.children).toHaveLength(1);

  // /(books)/[bookId]/author
  // /(books)/[bookId]/chapters
  expect(books?.children[0].children).toHaveLength(2);
  const chapters = books?.children[0].children.find((p) => p.pathName === 'chapters');
  expect(chapters?.pathName).toEqual('chapters');
  expect(chapters?.group).toEqual('books');

  // /(books)/[bookId]/chapters/[chapterId]
  // /(books)/[bookId]/chapters/highlight
  expect(chapters?.children).toHaveLength(2);

  expect(tree.render(4)).toMatchInlineSnapshot(`
    "/**
     * generated by pkg-name-for-test@pkg-version-for-test
     * @ref https://github.com/FrontEndDev-org/unplugin-react-pages
     * @ref https://react.dev
     * @ref https://reactrouter.com
     */

    import { Suspense, lazy, createElement } from "react";
    import { Outlet } from "react-router-dom";

    // pages
    const Page_0 = lazy(() => import("/page.tsx"));
    const Page_1 = lazy(() => import("/users/[username]/page.tsx"));
    const Page_3 = lazy(() => import("/users/pages/[pageNo]/page.tsx"));
    const Page_5 = lazy(() => import("/(books)/[bookId]/page.tsx"));
    const Page_7 = lazy(() => import("/(books)/[bookId]/author/page.tsx"));
    const Page_8 = lazy(() => import("/(books)/[bookId]/chapters/[chapterId]/page.tsx"));
    const Page_10 = lazy(() => import("/(books)/[bookId]/chapters/highlight/page.tsx"));

    // layouts

    export const routes = [
    {
        path: "",
        element: createElement(Suspense, {}, createElement(Page_0, null)),
    },
    {
        path: "users/:username",
        element: createElement(Suspense, {}, createElement(Page_1, null)),
    },
    {
        path: "users/pages/:pageNo",
        element: createElement(Suspense, {}, createElement(Page_3, null)),
    },
    {
        path: "books/:bookId",
        element: createElement(Suspense, {}, createElement(Page_5, null)),
    },
    {
        path: "books/:bookId/author",
        element: createElement(Suspense, {}, createElement(Page_7, null)),
    },
    {
        path: "books/:bookId/chapters/:chapterId",
        element: createElement(Suspense, {}, createElement(Page_8, null)),
    },
    {
        path: "books/:bookId/chapters/highlight",
        element: createElement(Suspense, {}, createElement(Page_10, null)),
    },
    ];
    "
  `);
});

it('分组 + 布局', () => {
  const includeLayoutDirs = [
    //
    '.',
    '(books)',
    '(books)/[bookId]/chapters',
  ];
  const tree = new FSTree({
    cwd: '/',
    logger: createLogger(),
    resolveFileName: (fsNode, fileType) => {
      if (fileType !== 'layout') return undefined;
      return includeLayoutDirs.includes(fsNode.dirName) ? 'layout.tsx' : undefined;
    },
    resolveDuplicate: () => undefined,
  });
  tree.mount([
    // pages
    'page.tsx',
    'users/[username]/page.tsx',
    'users/pages/[pageNo]/page.tsx',
    '(books)/[bookId]/page.tsx',
    '(books)/[bookId]/author/page.tsx',
    '(books)/[bookId]/chapters/[chapterId]/page.tsx',
    '(books)/[bookId]/chapters/highlight/page.tsx',
  ]);

  const fsPage0 = tree.dirMap.get(includeLayoutDirs[0]);
  expect(fsPage0?.layoutFileName).toEqual('layout.tsx');
  expect(fsPage0?.layoutFile).toEqual('/layout.tsx');
  expect(fsPage0?.pageFileName).toEqual('page.tsx');

  const fsPage1 = tree.dirMap.get(includeLayoutDirs[1]);
  expect(fsPage1?.layoutFileName).toEqual('layout.tsx');
  expect(fsPage1?.layoutFile).toEqual('/(books)/layout.tsx');
  expect(fsPage1?.pageFileName).toEqual('');

  const fsPage2 = tree.dirMap.get(includeLayoutDirs[2]);
  expect(fsPage2?.layoutFileName).toEqual('layout.tsx');
  expect(fsPage2?.layoutFile).toEqual('/(books)/[bookId]/chapters/layout.tsx');
  expect(fsPage2?.pageFileName).toEqual('');

  expect(tree.render(4)).toMatchInlineSnapshot(`
    "/**
     * generated by pkg-name-for-test@pkg-version-for-test
     * @ref https://github.com/FrontEndDev-org/unplugin-react-pages
     * @ref https://react.dev
     * @ref https://reactrouter.com
     */

    import { Suspense, lazy, createElement } from "react";
    import { Outlet } from "react-router-dom";

    // pages
    const Page_0 = lazy(() => import("/page.tsx"));
    const Page_1 = lazy(() => import("/users/[username]/page.tsx"));
    const Page_3 = lazy(() => import("/users/pages/[pageNo]/page.tsx"));
    const Page_5 = lazy(() => import("/(books)/[bookId]/page.tsx"));
    const Page_7 = lazy(() => import("/(books)/[bookId]/author/page.tsx"));
    const Page_8 = lazy(() => import("/(books)/[bookId]/chapters/[chapterId]/page.tsx"));
    const Page_10 = lazy(() => import("/(books)/[bookId]/chapters/highlight/page.tsx"));

    // layouts
    const Layout_0 = lazy(() => import("/layout.tsx"));
    const Layout_6 = lazy(() => import("/(books)/layout.tsx"));
    const Layout_9 = lazy(() => import("/(books)/[bookId]/chapters/layout.tsx"));

    export const routes = [
    {
        element: createElement(Suspense, {}, createElement(Layout_0, null)),
        children: [
            {
                path: "",
                element: createElement(Suspense, {}, createElement(Page_0, null)),
            },
            {
                path: "users/:username",
                element: createElement(Suspense, {}, createElement(Page_1, null)),
            },
            {
                path: "users/pages/:pageNo",
                element: createElement(Suspense, {}, createElement(Page_3, null)),
            },
        ],
    },
    {
        element: createElement(Suspense, {}, createElement(Layout_6, null)),
        children: [
            {
                path: "books/:bookId",
                element: createElement(Suspense, {}, createElement(Page_5, null)),
            },
            {
                path: "books/:bookId/author",
                element: createElement(Suspense, {}, createElement(Page_7, null)),
            },
            {
                element: createElement(Suspense, {}, createElement(Layout_9, null)),
                children: [
                    {
                        path: "books/:bookId/chapters/:chapterId",
                        element: createElement(Suspense, {}, createElement(Page_8, null)),
                    },
                    {
                        path: "books/:bookId/chapters/highlight",
                        element: createElement(Suspense, {}, createElement(Page_10, null)),
                    },
                ],
            },
        ],
    },
    ];
    "
  `);
});
