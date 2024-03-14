"use client"

import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import { useCurrentUserQuery, useLazyCurrentUserQuery } from "@/redux/api/endpoints/users/users";
import { setUser } from "@/redux/slices/user/userSlice";
import { IRootState, LoginErrorType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: IRootState) => state.userSlice)

    const token = Cookies.get('authToken');
    // console.log(token);
    const [getCurrentUser, { data: userData, isLoading, isError, error }] = useLazyCurrentUserQuery();

    console.log(userData);

    useEffect(() => {
        getCurrentUser(undefined);

        if (userData?.success && token) {
            dispatch(setUser({ user: userData.user, isAuthenticated: true }));
        }

    }, [userData, token, isAuthenticated]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Ensure children are returned when the user is authenticated
    if (isAuthenticated) {
        console.log('User is authenticated', userData);
        return children;
    }



    if (!isAuthenticated) {
        if ((error as LoginErrorType)?.status === 401 || (error as LoginErrorType)?.status === 'FETCH_ERROR') {
            if ((error as LoginErrorType)?.status === 'FETCH_ERROR') {
                return <div className="h-screen flex justify-center items-center">
                    <h1 className="text-3xl">Internal server error!</h1>
                </div>
            }
            return <AuthLayout />
        }
    }
};

export default AuthProvider;