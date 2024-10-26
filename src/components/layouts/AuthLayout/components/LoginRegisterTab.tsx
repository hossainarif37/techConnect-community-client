"use client"

import Link from "next/link";
import tabStyles from "./tab.module.css"

const LoginRegisterTab = ({ isLoginComponent, setIsLoginComponent }: any) => {


    return (
        <div>

            <div className="grid grid-cols-2 gap-2 relative">
                {/* Login */}

                <button
                    onClick={() => setIsLoginComponent(true)}
                    className={`${tabStyles.tab}`}>
                    Login
                </button>

                {/* Register */}
                <button
                    onClick={() => setIsLoginComponent(false)}
                    className={`${tabStyles.tab}`}>
                    Register
                </button>

                <span className={`${tabStyles.activeTab} absolute  ${!isLoginComponent ? `translate-x-full` : 'translate-x-0'}`}></span>
            </div>

        </div>
    );
};

export default LoginRegisterTab;