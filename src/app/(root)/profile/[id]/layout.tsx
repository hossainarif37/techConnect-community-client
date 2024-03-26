import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTabs from "../components/ProfileTabs/ProfileTabs";


export const metadata: Metadata = {
    title: "Profile",
    description: "This is Profile Page",
};

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {



    return (
        <>
            <ProfileHeader />

            <div className="container">
                <hr className="mt-5" />
                <ProfileTabs />
                {/* <NewsFeedLayout /> */}
            </div>

            <main>
                {children}
            </main>
        </>
    );
}
