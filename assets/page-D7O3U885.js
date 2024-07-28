import{j as s}from"./index-BWSNXFtw.js";function l(a){const e={code:"code",h1:"h1",pre:"pre",span:"span",...a.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.h1,{children:"安装"}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"hljs language-bash",children:`npm install react react-dom react-router-dom
npm install -D @types/react @types/react-dom
npm install -D vite @vitejs/plugin-react unplugin-react-pages
`})}),`
`,s.jsx(e.h1,{children:"使用（createRouter 方式）"}),`
`,s.jsx(e.pre,{children:s.jsxs(e.code,{className:"hljs language-jsx",children:[s.jsx(e.span,{className:"hljs-comment",children:"// main.jsx"}),`
`,s.jsx(e.span,{className:"hljs-keyword",children:"import"})," { ",s.jsx(e.span,{className:"hljs-title class_",children:"StrictMode"})," } ",s.jsx(e.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(e.span,{className:"hljs-string",children:'"react"'}),`;
`,s.jsx(e.span,{className:"hljs-keyword",children:"import"})," ",s.jsx(e.span,{className:"hljs-title class_",children:"ReactDOM"})," ",s.jsx(e.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(e.span,{className:"hljs-string",children:'"react-dom/client"'}),`;
`,s.jsx(e.span,{className:"hljs-keyword",children:"import"})," { createHashRouter, ",s.jsx(e.span,{className:"hljs-title class_",children:"RouterProvider"})," } ",s.jsx(e.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(e.span,{className:"hljs-string",children:'"react-router-dom"'}),`;
`,s.jsx(e.span,{className:"hljs-keyword",children:"import"})," { routes } ",s.jsx(e.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(e.span,{className:"hljs-string",children:'"virtual:react-app"'}),`;

`,s.jsx(e.span,{className:"hljs-keyword",children:"const"})," router = ",s.jsx(e.span,{className:"hljs-title function_",children:"createHashRouter"}),`(routes);

`,s.jsx(e.span,{className:"hljs-title class_",children:"ReactDOM"}),".",s.jsx(e.span,{className:"hljs-title function_",children:"createRoot"}),"(",s.jsx(e.span,{className:"hljs-variable language_",children:"document"}),".",s.jsx(e.span,{className:"hljs-title function_",children:"getElementById"}),"(",s.jsx(e.span,{className:"hljs-string",children:'"root"'}),")).",s.jsx(e.span,{className:"hljs-title function_",children:"render"}),`(
    `,s.jsxs(e.span,{className:"xml",children:[s.jsxs(e.span,{className:"hljs-tag",children:["<",s.jsx(e.span,{className:"hljs-name",children:"StrictMode"}),">"]}),`
        `,s.jsxs(e.span,{className:"hljs-tag",children:["<",s.jsx(e.span,{className:"hljs-name",children:"RouterProvider"})," ",s.jsx(e.span,{className:"hljs-attr",children:"router"}),"=",s.jsx(e.span,{className:"hljs-string",children:"{router}"})," />"]}),`
    `,s.jsxs(e.span,{className:"hljs-tag",children:["</",s.jsx(e.span,{className:"hljs-name",children:"StrictMode"}),">"]})]}),`,
);
`]})}),`
`,s.jsx(e.h1,{children:"使用（useRoutes 方式）"}),`
`,s.jsx(e.pre,{children:s.jsxs(e.code,{className:"hljs language-jsx",children:[s.jsx(e.span,{className:"hljs-comment",children:"// main.jsx"}),`
`,s.jsx(e.span,{className:"hljs-keyword",children:"import"})," { ",s.jsx(e.span,{className:"hljs-title class_",children:"StrictMode"})," } ",s.jsx(e.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(e.span,{className:"hljs-string",children:'"react"'}),`;
`,s.jsx(e.span,{className:"hljs-keyword",children:"import"})," ",s.jsx(e.span,{className:"hljs-title class_",children:"ReactDOM"})," ",s.jsx(e.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(e.span,{className:"hljs-string",children:'"react-dom/client"'}),`;
`,s.jsx(e.span,{className:"hljs-keyword",children:"import"})," { ",s.jsx(e.span,{className:"hljs-title class_",children:"HashRouter"})," } ",s.jsx(e.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(e.span,{className:"hljs-string",children:'"react-router-dom"'}),`;
`,s.jsx(e.span,{className:"hljs-keyword",children:"import"})," ",s.jsx(e.span,{className:"hljs-title class_",children:"App"})," ",s.jsx(e.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(e.span,{className:"hljs-string",children:"'./App'"}),`;

`,s.jsx(e.span,{className:"hljs-title class_",children:"ReactDOM"}),".",s.jsx(e.span,{className:"hljs-title function_",children:"createRoot"}),"(",s.jsx(e.span,{className:"hljs-variable language_",children:"document"}),".",s.jsx(e.span,{className:"hljs-title function_",children:"getElementById"}),"(",s.jsx(e.span,{className:"hljs-string",children:'"root"'}),")).",s.jsx(e.span,{className:"hljs-title function_",children:"render"}),`(
    `,s.jsxs(e.span,{className:"xml",children:[s.jsxs(e.span,{className:"hljs-tag",children:["<",s.jsx(e.span,{className:"hljs-name",children:"StrictMode"}),">"]}),`
        `,s.jsxs(e.span,{className:"hljs-tag",children:["<",s.jsx(e.span,{className:"hljs-name",children:"HashRouter"}),">"]}),`
            `,s.jsxs(e.span,{className:"hljs-tag",children:["<",s.jsx(e.span,{className:"hljs-name",children:"App"})," />"]}),`
        `,s.jsxs(e.span,{className:"hljs-tag",children:["</",s.jsx(e.span,{className:"hljs-name",children:"HashRouter"}),">"]}),`
    `,s.jsxs(e.span,{className:"hljs-tag",children:["</",s.jsx(e.span,{className:"hljs-name",children:"StrictMode"}),">"]})]}),`,
);
`]})}),`
`,s.jsx(e.pre,{children:s.jsxs(e.code,{className:"hljs language-jsx",children:[s.jsx(e.span,{className:"hljs-comment",children:"// app.jsx"}),`
`,s.jsx(e.span,{className:"hljs-keyword",children:"import"})," { useRoutes } ",s.jsx(e.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(e.span,{className:"hljs-string",children:'"react-router-dom"'}),`;
`,s.jsx(e.span,{className:"hljs-keyword",children:"import"})," { routes } ",s.jsx(e.span,{className:"hljs-keyword",children:"from"})," ",s.jsx(e.span,{className:"hljs-string",children:'"virtual:react-app"'}),`;

`,s.jsx(e.span,{className:"hljs-keyword",children:"export"})," ",s.jsx(e.span,{className:"hljs-keyword",children:"default"})," ",s.jsx(e.span,{className:"hljs-keyword",children:"function"})," ",s.jsx(e.span,{className:"hljs-title function_",children:"App"}),"(",s.jsx(e.span,{className:"hljs-params"}),`) {
    `,s.jsx(e.span,{className:"hljs-keyword",children:"return"})," ",s.jsx(e.span,{className:"hljs-title function_",children:"useRoutes"}),`(routes);
}
`]})})]})}function c(a={}){const{wrapper:e}=a.components||{};return e?s.jsx(e,{...a,children:s.jsx(l,{...a})}):l(a)}export{c as default};
