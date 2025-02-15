"use client"

import Login from "@/components/layouts/AuthLayout/components/Login/Login";
import LoginRegisterTab from "@/components/layouts/AuthLayout/components/LoginRegisterTab";
import Register from "@/components/layouts/AuthLayout/components/Register/Register";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthLayout = () => {
    const pathName = usePathname();
    const isLoginComponent = pathName === '/login';
    return (
        <div className="">
            <Link href="/" className="p-5 underline flex items-center"><ChevronLeft className="w-5 h-5" />Back to Home</Link>
            <div className="min-h-screen pt-20 lg:pt-40 container">
                <div className="w-full md:w-[450px] mx-auto rounded-md md:shadow-md md:shadow-secondary md:border md:border-secondary/75 px-5 md:p-10">

                    <LoginRegisterTab />

                    {
                        isLoginComponent ? <Login /> : <Register />
                    }

                </div>
            </div>
        </div>
    );
};

export default AuthLayout;