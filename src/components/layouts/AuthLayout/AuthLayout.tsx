"use client"

import LoginRegisterTab from "./components/LoginRegisterTab";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Login from "@/components/layouts/AuthLayout/components/Login/Login";
import Register from "@/components/layouts/AuthLayout/components/Register/Register";

const AuthLayout = () => {
    const [isLoginComponent, setIsLoginComponent] = useState(true);

    return (
        <div className="container">
            <div className="my-20 md:my-40">
                <div className="w-full md:w-[450px] mx-auto rounded md:shadow-lg px-5 md:p-10">
                    <LoginRegisterTab isLoginComponent={isLoginComponent} setIsLoginComponent={setIsLoginComponent} />
                    {isLoginComponent ? <Login isLoginComponent={isLoginComponent} setIsLoginComponent={setIsLoginComponent} /> :
                        <Register isLoginComponent={isLoginComponent} setIsLoginComponent={setIsLoginComponent} />}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;