import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import CatergorySideBar from "./profile/components/CatergorySideBar";


export const metadata: Metadata = {
    title: "Home",
    description: "This is Home Page",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="px-3">
                {children}
            </main>
        </>
    );
}
