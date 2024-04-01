import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTabs from "../components/ProfileTabs/ProfileTabs";
import CatergorySideBar from "../components/CatergorySideBar";


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

            <main className="container">
                <hr className="mt-5" />
                <ProfileTabs />

                {/* Newsfeed Layout */}
                <div className="flex">
                    {/* Category Sidebar */}
                    <div>
                        <CatergorySideBar />
                    </div>

                    {/* Posts Area */}
                    <div>
                        {children}
                    </div>
                </div>
                {/* <NewsFeedLayout /> */}
            </main>
        </>
    );
}
