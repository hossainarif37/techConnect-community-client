"use client"

import { LuLogOut } from "react-icons/lu";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@/types";
import { useRouter } from "next/navigation";

const LoginLogoutButton = ({ isDesktop }: { isDesktop: boolean }) => {
    const { email } = useSelector((state: IRootState) => state.userSlice);

    const router = useRouter();

    return (
        <>
            {
                email ?
                    <button onClick={() => {
                        localStorage.removeItem('token');
                        // setUser(null);
                        router.push('/');
                    }}
                        className={`${!isDesktop && 'w-full'} btn border-black flex items-center justify-center gap-2`}>
                        <span>Logout</span>
                        <span className="mt-[2px]"><LuLogOut /></span>
                    </button>
                    :
                    <button onClick={() => {
                        router.push('/login');
                    }} className={`${!isDesktop && 'w-full'}  btn border-primary hover:bg-primary hover:text-white`}>Login</button>
            }
        </>
    );
};

export default LoginLogoutButton;