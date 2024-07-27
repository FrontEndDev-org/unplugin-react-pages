import { indentLine, jsxLikeStringify } from '../helpers';
import type { FSNode, FSTree } from './FSTree';
import nodePath from 'path';

class PageRoute {
    parent?: LayoutRoute;
    constructor(readonly fsNode: FSNode) {}

    get id() {
        return this.fsNode.id;
    }

    get path() {
        const paths = [this.fsNode.path];
        const find = (fsNode?: FSNode) => {
            if (!fsNode) return;

            // 有分组 depth = 1 结束
            if (fsNode.group && fsNode.depth === 1) {
                paths.unshift(fsNode.path);
                return;
            }

            // 直到包含路由的节点为止
            if (!fsNode.group && fsNode.layoutFileName) return;

            paths.unshift(fsNode.path);
            find(fsNode.parent);
        };

        find(this.fsNode.parent);
        return paths.length === 0 || (paths.length === 1 && paths.at(0) === '') ? '' : nodePath.join(...paths);
    }

    render(indent = 0, tabSize = 4) {
        const indent_1 = indent * tabSize;
        const indent_2 = (indent + 1) * tabSize;
        const lines = [
            //
            indentLine('{', indent_1),
        ];

        // path
        lines.push(indentLine(`path: ${JSON.stringify(this.path)},`, indent_2));

        // element
        const pageName = FSRouter.makePageComponentName(this.fsNode.id);
        const element = jsxLikeStringify({
            tag: 'Suspense',
            props: {},
            children: [{ tag: pageName }],
        });
        lines.push(indentLine(`element: ${element},`, indent_2));
        lines.push(indentLine('},', indent_1));

        return lines;
    }
}

class LayoutRoute {
    parent?: LayoutRoute;
    children: (LayoutRoute | PageRoute)[] = [];
    constructor(readonly fsNode: FSNode) {}

    get id() {
        return this.fsNode.id;
    }

    render(indent = 0, tabSize = 4) {
        const indent_1 = indent * tabSize;
        const indent_2 = (indent + 1) * tabSize;
        const lines = [
            //
            indentLine('{', indent_1),
        ];

        // element
        const layoutName = FSRouter.makeLayoutComponentName(this.fsNode.id);
        const element = jsxLikeStringify({
            tag: 'Suspense',
            props: {},
            children: [{ tag: layoutName }],
        });
        lines.push(indentLine(`element: ${element},`, indent_2));

        if (this.children.length) {
            lines.push(indentLine('children: [', indent_2));
            lines.push(...this.children.flatMap((child) => child.render(indent + 2, tabSize)));
            lines.push(indentLine('],', indent_2));
        }

        lines.push(indentLine('},', indent_1));
        return lines;
    }
}

export class FSRouter {
    constructor(readonly fsTree: FSTree) {}

    pageRoutes = new Map<number, PageRoute>();
    addPageNode(fsNode: FSNode) {
        this.pageRoutes.set(fsNode.id, new PageRoute(fsNode));
    }

    layoutRoutes = new Map<number, LayoutRoute>();
    addLayoutNode(fsNode: FSNode) {
        this.layoutRoutes.set(fsNode.id, new LayoutRoute(fsNode));
    }

    build() {
        this.pageRoutes.forEach((pageRoute) => {
            const find = (node: FSNode) => {
                if (node.layoutFileName) {
                    const layoutRoute = this.layoutRoutes.get(node.id);

                    if (layoutRoute) {
                        pageRoute.parent = layoutRoute;
                        layoutRoute.children.push(pageRoute);
                        return;
                    }
                }

                if (node.parent) find(node.parent);
            };

            find(pageRoute.fsNode);
        });

        this.layoutRoutes.forEach((layoutRoute) => {
            const find = (node: FSNode) => {
                const parent = node.parent;
                if (!parent) return;

                // 独立分组布局根节点
                if (node.group && node.depth === 1) return;

                if (parent.layoutFileName) {
                    const parentRoute = this.layoutRoutes.get(parent.id);

                    if (parentRoute) {
                        layoutRoute.parent = parentRoute;
                        parentRoute.children.push(layoutRoute);
                        return;
                    }
                }

                find(parent);
            };

            find(layoutRoute.fsNode);
        });
    }

    render(tabSize = 4) {
        const importPages = ['// pages'];
        const importLayouts = ['// layouts'];

        const pageLines: string[] = [];
        this.pageRoutes.forEach((route) => {
            const importName = FSRouter.makePageComponentName(route.id);
            importPages.push(`const ${importName} = lazy(() => import("${route.fsNode.pageFile}"));`);

            if (!route.parent) {
                pageLines.push(...route.render(0, tabSize));
            }
        });

        const layoutLines: string[] = [];
        this.layoutRoutes.forEach((route) => {
            const importName = FSRouter.makeLayoutComponentName(route.id);
            importLayouts.push(`const ${importName} = lazy(() => import("${route.fsNode.layoutFile}"));`);

            if (!route.parent) {
                layoutLines.push(...route.render(0, tabSize));
            }
        });

        return [
            '/**',
            ' * generated by pkg-name-for-test@pkg-version-for-test',
            ' * @ref https://github.com/FrontEndDev-org/unplugin-react-pages',
            ' * @ref https://reactrouter.com/',
            ' */',
            '',
            'import { Suspense, lazy, createElement } from "react";',
            'import { Outlet } from "react-router-dom";',
            '',
            ...importPages,
            '',
            ...importLayouts,
            '',
            'export const routes = [',
            ...pageLines,
            ...layoutLines,
            '];',
            '',
        ].join('\n');
    }

    // TODO
    update() {}

    static makeLayoutComponentName(id: number) {
        return 'Layout_' + id;
    }

    static makePageComponentName(id: number) {
        return 'Page_' + id;
    }
}