"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import tabStyles from "./tab.module.css"

const LoginRegisterTab = () => {
    const pathname = usePathname();
    console.log(pathname);




    return (
        <div>

            <div className="grid grid-cols-2 gap-2 relative">
                {/* Login */}
                <Link href='/login' className={`${tabStyles.tab} ${pathname === '/login' ? 'text-white' : 'text-gray-700'}`}>
                    Login
                </Link>

                {/* Register */}
                <Link href='/register' className={`${tabStyles.tab} ${pathname === '/register' ? 'text-white' : 'text-gray-700'}`}>
                    Register
                </Link>

                <span className={`${tabStyles.activeTab} absolute  ${pathname === '/register' ? `translate-x-full` : 'translate-x-0'}`}></span>
            </div>

        </div>
    );
};

export default LoginRegisterTab;