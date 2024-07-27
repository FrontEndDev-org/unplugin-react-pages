import type { ReactNode } from "react";
import SvgIcon from "../icons/SvgIcon";
import classNames from "classnames";
import { Link } from "react-router-dom";

function Stack({ icon, label }: { icon: ReactNode; label: ReactNode }) {
    return (
        <div className={classNames("flex flex-col gap-5 justify-between items-center")}>
            {icon}
            <div className="text-10 text-gray-7 text-center">{label}</div>
        </div>
    );
}

export default function Page() {
    return (
        <div className="grow-1 flex flex-col items-center gap-20">
            <div className="flex flex-col gap-10 items-center pt-15">
                <div className="flex gap-4 items-center text-8 text-blue-6">一个基于文件系统</div>

                <div className="grid grid-cols-3 gap-4 items-center place-items-center">
                    <div className={"flex flex-col gap-5 justify-between items-center"}>
                        <SvgIcon className="w-30 h-30" icon="react" />
                        <span className="text-#007398 text-10">React 应用</span>
                    </div>
                    <span className="text-8 text-gray">×</span>
                    <div className={"flex flex-col gap-5 justify-between items-center"}>
                        <SvgIcon className="w-30 h-30" icon="react-router" />
                        <span className="text-10 text-#D30019">React Router</span>
                    </div>
                </div>

                <div className={"flex flex-col gap-5 justify-between items-center"}>
                    <SvgIcon className="w-20 h-20" icon="vite" />
                    <span className="text-8 text-#BE32F7">Vite 插件</span>
                </div>
            </div>

            <Link to="/docs/quick-start" className="text-6 decoration-none text-gray-8 hover:text-gray-7 px-10 py-5 bg-gray-1 rounded-2 hover:bg-gray-2 transition-background-color duration-300">
                快速开始
            </Link>
        </div>
    );
}
