"use client"

import Link from "next/link";
import tabStyles from "./tab.module.css"
import { usePathname, useRouter } from "next/navigation";

const LoginRegisterTab = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isLoginComponent = pathname === '/login';
    const handleNavigate = (path: string) => {
        if (path === "/login") {
            router.push("/login");
        } else {
            router.push("/register");
        }
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-2 relative">
                {/* Login */}

                <button
                    onClick={() => handleNavigate("/login")}
                    className={`${tabStyles.tab}`}>
                    Login
                </button>

                {/* Register */}
                <button
                    onClick={() => handleNavigate("/register")}
                    className={`${tabStyles.tab}`}>
                    Register
                </button>

                <span className={`${tabStyles.activeTab} absolute  ${!isLoginComponent ? `translate-x-full` : 'translate-x-0'}`}></span>
            </div>

        </div>
    );
};

export default LoginRegisterTab;