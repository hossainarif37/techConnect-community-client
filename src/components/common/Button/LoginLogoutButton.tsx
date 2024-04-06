"use client"

import { LuLogOut } from "react-icons/lu";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { removeUser } from "@/redux/slices/user/userSlice";

const LoginLogoutButton = ({ isDesktop }: { isDesktop: boolean }) => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const dispatch = useDispatch();

    const router = useRouter();

    const handleLogout = () => {
        router.push('/');
        Cookies.remove('authToken');
        dispatch(removeUser());
        // Use setTimeout to ensure the state update is processed before redirecting
    };


    return (
        <>
            {
                user ?
                    <button onClick={handleLogout}
                        className={`${!isDesktop && 'w-full'} btn border-black flex items-center justify-center gap-2`}>
                        <span>Logout</span>
                        <span className="mt-[2px]"><LuLogOut /></span>
                    </button>
                    :
                    <button className={`${!isDesktop && 'w-full'}`}>Login</button>
            }
        </>
    );
};

export default LoginLogoutButton;