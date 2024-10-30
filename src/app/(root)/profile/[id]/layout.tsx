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
        <div className="lg:max-w-5xl mx-auto xl:max-w-full">
            <ProfileHeader />

            <main className="container">
                {/* <hr className="mt-5 border-none h-[1px] w-full bg-secondary" /> */}
                <ProfileTabs />

                {/* News feed Layout */}
                <div className="flex flex-col md:flex-row">
                    {/* Category Sidebar */}
                        <CategorySideBar />

                    {/* News feed Area */}
                    {children}
                </div>
            </main>
        </div>
    );
}
