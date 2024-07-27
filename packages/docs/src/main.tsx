import { createElement, lazy, StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, HashRouter, Link, RouterProvider } from "react-router-dom";
import "./main.scss";
import "virtual:uno.css";
import 'virtual:svg-icons-register';
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HashRouter basename="/">
            <App />
        </HashRouter>
    </StrictMode>,
);
