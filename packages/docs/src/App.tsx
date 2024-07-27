import classNames from "classnames";
import type { PropsWithChildren } from "react";
import { Link, NavLink, useRoutes } from "react-router-dom";
import { routes } from "virtual:react-app";
import SvgIcon from "./icons/SvgIcon";

function A({ children, to }: PropsWithChildren<{ to: string }>) {
    return (
        <NavLink
            className={({ isActive }) =>
                classNames(
                    {
                        "bg-gray-6! text-gray-1!": isActive,
                    },
                    "text-4 text-gray-7 decoration-none rounded-1 px-4 py-2 flex items-center hover:bg-gray-2 transition-background-color duration-300",
                )
            }
            to={to}
        >
            {children}
        </NavLink>
    );
}

export default function App({ children }: PropsWithChildren) {
    return (
        <section className="min-h-screen max-w-200 mx-auto flex flex-col gap-5 pt-2 px-5 pb-5">
            <header className="flex justify-between items-center pa-2 relative sticky-0 top-0 z-9 bg-gray-1 rounded-2 shadow sticky top-2">
                <A to="/">unplugin-react-pages</A>

                <div className="flex items-center gap-4 list-none">
                    <A to="/docs">Docs</A>
                    <A to="/demo">Demo</A>
                    <A to="https://github.com/FrontEndDev-org/unplugin-react-pages">
                        <SvgIcon icon="github" className="w-5 h-5" />
                    </A>
                </div>
            </header>

            <div className="grow-1 flex flex-col">{useRoutes(routes)}</div>
        </section>
    );
}
