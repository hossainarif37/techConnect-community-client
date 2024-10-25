import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTabs from "../components/ProfileTabs/ProfileTabs";
import CategorySideBar from "../components/CategorySideBar";


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
                {/* <hr className="mt-5 border-none h-[1px] w-full bg-secondary" /> */}
                <ProfileTabs />

                {/* News feed Layout */}
                <div className="flex">
                    {/* Category Sidebar */}
                    <div>
                        <CategorySideBar />
                    </div>

                    {/* News feed Area */}
                    {children}
                </div>
            </main>
        </>
    );
}
