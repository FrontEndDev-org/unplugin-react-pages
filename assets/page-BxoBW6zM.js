import{j as s}from"./index-BWSNXFtw.js";function a(n){const e={code:"code",h1:"h1",pre:"pre",span:"span",...n.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.h1,{children:"安装插件"}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"hljs language-bash",children:`npm i -D unplugin-react-pages
`})}),`
`,s.jsx(e.h1,{children:"使用插件"}),`
`,s.jsx(e.pre,{children:s.jsxs(e.code,{className:"hljs language-js",children:[s.jsx(e.span,{className:"hljs-keyword",children:"import"})," { defineConfig } ",s.jsx(e.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(e.span,{className:"hljs-string",children:'"vite"'}),`;
`,s.jsx(e.span,{className:"hljs-keyword",children:"import"})," react ",s.jsx(e.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(e.span,{className:"hljs-string",children:'"@vitejs/plugin-react"'}),`;
`,s.jsx(e.span,{className:"hljs-keyword",children:"import"})," { reactPages } ",s.jsx(e.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(e.span,{className:"hljs-string",children:'"unplugin-react-pages"'}),`;

`,s.jsx(e.span,{className:"hljs-keyword",children:"export"})," ",s.jsx(e.span,{className:"hljs-keyword",children:"default"})," ",s.jsx(e.span,{className:"hljs-title function_",children:"defineConfig"}),`({
    `,s.jsx(e.span,{className:"hljs-attr",children:"plugins"}),`: [
        `,s.jsx(e.span,{className:"hljs-comment",children:"// plugins"}),`
        `,s.jsx(e.span,{className:"hljs-title function_",children:"react"}),`(),
        reactPages.`,s.jsx(e.span,{className:"hljs-title function_",children:"vite"}),`(),
    ],
});
`]})}),`
`,s.jsx(e.h1,{children:"导入应用路由"}),`
`,s.jsx(e.pre,{children:s.jsxs(e.code,{className:"hljs language-js",children:[s.jsx(e.span,{className:"hljs-keyword",children:"import"})," { routes } ",s.jsx(e.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(e.span,{className:"hljs-string",children:'"virtual:react-app"'}),`;

`,s.jsx(e.span,{className:"hljs-keyword",children:"const"})," router = ",s.jsx(e.span,{className:"hljs-title function_",children:"createHashRouter"}),`(routes);

`,s.jsx(e.span,{className:"xml",children:s.jsxs(e.span,{className:"hljs-tag",children:["<",s.jsx(e.span,{className:"hljs-name",children:"RouterProvider"})," ",s.jsx(e.span,{className:"hljs-attr",children:"router"}),"=",s.jsx(e.span,{className:"hljs-string",children:"{router}"})," />"]})}),`;
`]})}),`
`,s.jsx(e.h1,{children:"创建页面"}),`
`,s.jsx(e.pre,{children:s.jsxs(e.code,{className:"hljs language-js",children:[s.jsx(e.span,{className:"hljs-comment",children:"// src/app/page.jsx"}),`
`,s.jsx(e.span,{className:"hljs-keyword",children:"export"})," ",s.jsx(e.span,{className:"hljs-keyword",children:"default"})," ",s.jsx(e.span,{className:"hljs-keyword",children:"function"})," ",s.jsx(e.span,{className:"hljs-title function_",children:"Page"}),"(",s.jsx(e.span,{className:"hljs-params"}),`) {
    `,s.jsx(e.span,{className:"hljs-keyword",children:"return"})," ",s.jsxs(e.span,{className:"xml",children:[s.jsxs(e.span,{className:"hljs-tag",children:["<",s.jsx(e.span,{className:"hljs-name",children:"div"}),">"]}),"Hello World",s.jsxs(e.span,{className:"hljs-tag",children:["</",s.jsx(e.span,{className:"hljs-name",children:"div"}),">"]})]}),`;
}
`]})})]})}function c(n={}){const{wrapper:e}=n.components||{};return e?s.jsx(e,{...n,children:s.jsx(a,{...n})}):a(n)}export{c as default};
