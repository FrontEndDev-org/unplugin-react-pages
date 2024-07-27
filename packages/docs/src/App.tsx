import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import { NavLink, useRoutes } from 'react-router-dom';
import { routes } from 'virtual:react-app';
import SvgIcon from './icons/SvgIcon';

function A({ children, to }: PropsWithChildren<{ to: string }>) {
  return (
    <NavLink
      className={({ isActive }) =>
        classNames(
          {
            'bg-gray-6! text-gray-1!': isActive,
          },
          'text-4 text-gray-7 decoration-none rounded-1 px-4 py-2 flex items-center hover:bg-gray-2 transition-background-color duration-300',
        )
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}

export default function App() {
  return (
    <section className="mx-auto max-w-200 min-h-screen flex flex-col gap-5 px-5 pb-5 pt-2">
      <header className="sticky-0 relative sticky top-0 top-2 z-9 flex items-center justify-between rounded-2 bg-gray-1 pa-2 shadow">
        <A to="/">unplugin-react-pages</A>

        <div className="flex list-none items-center gap-4">
          <A to="/docs">Docs</A>
          <A to="/demo">Demo</A>
          <A to="https://github.com/FrontEndDev-org/unplugin-react-pages">
            <SvgIcon icon="github" className="h-5 w-5" />
          </A>
        </div>
      </header>

      <div className="flex grow-1 flex-col">{useRoutes(routes)}</div>
    </section>
  );
}
