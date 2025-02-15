"use client"

import { useLazyCurrentUserQuery } from "@/redux/api/endpoints/users/users";
import { setUser } from "@/redux/slices/user/userSlice";
import { IRootState } from "@/types/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Loading from "../components/common/Loading"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [getCurrentUser, { data: userData, isLoading }] = useLazyCurrentUserQuery();
    const { isAuthenticated } = useSelector((state: IRootState) => state.userSlice);
    const dispatch = useDispatch();
    const token = Cookies.get('authToken');

    useEffect(() => {
        if (!isAuthenticated) {
            getCurrentUser(undefined);
        }
        if (userData?.success && token && !isAuthenticated) {
            dispatch(setUser({ user: userData.user, isAuthenticated: true }));
        }

    }, [userData, token, isAuthenticated]);


    if (isLoading) {
        return <Loading />;
    }

    // Ensure children are returned when the user is authenticated
    return children;
};

export default AuthProvider;