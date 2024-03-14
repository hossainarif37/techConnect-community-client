"use client"

import Link from "next/link";
import tabStyles from "./tab.module.css"

const LoginRegisterTab = ({ isLoginComponent, setIsLoginComponent }: any) => {
    // const isLoginComponent = useisLoginComponent();
    // console.log(isLoginComponent);


    return (
        <div>

            <div className="grid grid-cols-2 gap-2 relative">
                {/* Login */}

                <button
                    onClick={() => setIsLoginComponent(true)}
                    className={`${tabStyles.tab} ${isLoginComponent ? 'text-white' : 'text-gray-700'}`}>
                    Login

                </button>

                {/* Register */}
                <button
                    onClick={() => setIsLoginComponent(false)}
                    className={`${tabStyles.tab} ${!isLoginComponent ? 'text-white' : 'text-gray-700'}`}>
                    Register
                </button>

                <span className={`${tabStyles.activeTab} absolute  ${!isLoginComponent ? `translate-x-full` : 'translate-x-0'}`}></span>
            </div>

        </div>
    );
};

export default LoginRegisterTab;