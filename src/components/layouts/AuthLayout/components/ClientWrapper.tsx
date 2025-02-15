"use client";
import { ReactNode } from 'react';
import useScreenSize from "@/hooks/useScreenSize";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import ActiveUserSideBar from '@/components/ActiveUserSideBar/ActiveUserSideBar';

export default function ClientWrapper({ children }: { children: ReactNode }) {
    const screenSize = useScreenSize();
    const largeScreen = screenSize.width >= 1280;
    const { user } = useSelector((state: IRootState) => state.userSlice);

    return (
        <div className="flex flex-col md:flex-row">
            {children}
            <ActiveUserSideBar />
        </div>
    );
}