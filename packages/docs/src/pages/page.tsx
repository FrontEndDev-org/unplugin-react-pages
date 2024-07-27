import { Link } from 'react-router-dom';
import SvgIcon from '../icons/SvgIcon';

export default function Page() {
  return (
    <div className="flex grow-1 flex-col items-center gap-20">
      <div className="flex flex-col items-center gap-10 pt-15">
        <div className="flex items-center gap-4 text-6 text-blue-6">一个基于文件系统</div>

        <div className="grid grid-cols-3 place-items-center items-center gap-4">
          <div className="flex flex-col items-center justify-between gap-5">
            <SvgIcon className="h-30 w-30" icon="react" />
            <span className="text-8 text-#007398">React 应用</span>
          </div>
          <span className="text-8 text-gray">×</span>
          <div className="flex flex-col items-center justify-between gap-5">
            <SvgIcon className="h-30 w-30" icon="react-router" />
            <span className="text-8 text-#D30019">React Router</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5">
          <SvgIcon className="h-20 w-20" icon="unplugin" />
          <span className="text-8 text-#BE32F7">通用插件</span>
        </div>
      </div>

      <Link
        to="/docs"
        className="rounded-2 bg-gray-1 px-10 py-5 text-6 text-gray-8 decoration-none transition-background-color duration-300 hover:bg-gray-2 hover:text-gray-7"
      >
        快速开始
      </Link>
    </div>
  );
}
