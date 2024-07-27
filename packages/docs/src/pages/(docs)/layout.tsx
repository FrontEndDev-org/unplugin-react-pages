import classNames from 'classnames';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './highlight.scss';
import './markdown.scss';

const navs = [
  {
    label: '快速开始',
    href: '/docs',
  },
  {
    label: '从 provider 开始',
    href: '/docs/start-provider',
  },
  {
    label: '从 hook 开始',
    href: '/docs/start-hook',
  },
  {
    label: '插件选项',
    href: '/docs/options',
  },
  {
    label: '路由布局 layout',
    href: '/docs/layout',
  },
  {
    label: '路由分组 group',
    href: '/docs/group',
  },
  {
    label: '加载中 loading',
    href: '/docs/loading',
  },
  {
    label: '未找到 404',
    href: '/docs/404',
  },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="grid grid-cols-[150px_1fr] gap-5">
      <div>
        <aside className="fixed">
          <div className="w-150px flex flex-col gap-2 text-14px">
            {navs.map((nav) => (
              <NavLink
                key={nav.label}
                className={({ isActive }) =>
                  classNames(
                    {
                      'bg-gray-6! text-gray-1!': location.pathname === nav.href || (nav.href !== '/docs' && isActive),
                    },
                    'bg-transparent text-gray-6 hover:bg-gray-2 block decoration-none rounded-1 px-3 py-2',
                  )
                }
                to={nav.href}
              >
                {nav.label}
              </NavLink>
            ))}
          </div>
        </aside>
      </div>

      <main className="markdown-body min-w-100%">
        <Outlet />
      </main>
    </div>
  );
}
