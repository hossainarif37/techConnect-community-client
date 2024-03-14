"use client"

import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import { useCurrentUserQuery } from "@/redux/api/endpoints/users/users";
import { setUser } from "@/redux/slices/user/userSlice";
import { IRootState, LoginErrorType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: IRootState) => state.userSlice)
    const { data: userData, isLoading, isError, error } = useCurrentUserQuery(undefined);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (userData?.success) {
            dispatch(setUser({ user: userData.user, isAuthenticated: true }));
        }
    }, [isLoading, userData, isError, error, dispatch, user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Ensure children are returned when the user is authenticated
    if (userData?.success || isAuthenticated) {
        console.log('User is authenticated', isAuthenticated);
        return children;
    }



    if (isError) {
        console.log(error);
        if ((error as LoginErrorType)?.status === 401) {
            return <AuthLayout />
        }
    }
};

export default AuthProvider;