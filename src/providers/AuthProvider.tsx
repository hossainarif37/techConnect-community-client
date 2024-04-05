"use client"

import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import { useCurrentUserQuery, useLazyCurrentUserQuery } from "@/redux/api/endpoints/users/users";
import { setUser } from "@/redux/slices/user/userSlice";
import { IRootState, LoginErrorType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Loading from "../components/common/Loading"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: IRootState) => state.userSlice)

    const token = Cookies.get('authToken');
    const router = useRouter();
    const [getCurrentUser, { data: userData, isLoading, isError, error }] = useLazyCurrentUserQuery();


    useEffect(() => {
        getCurrentUser(undefined);

        if (userData?.success && token) {
            dispatch(setUser({ user: userData.user, isAuthenticated: true }));
        }

    }, [userData, token, isAuthenticated]);


    if (isLoading) {
        return <Loading />;
    }

    // Ensure children are returned when the user is authenticated
    if (isAuthenticated) {
        return children;
    }



    if (!isAuthenticated) {
        if ((error as LoginErrorType)?.status === 401 || (error as LoginErrorType)?.status === 'FETCH_ERROR') {
            if ((error as LoginErrorType)?.status === 'FETCH_ERROR') {
                return <div className="h-screen flex justify-center items-center">
                    <h1 className="text-3xl">Internal server error!</h1>
                </div>
            }
            router.push('/');
            return <AuthLayout />
        }
    }
};

export default AuthProvider;