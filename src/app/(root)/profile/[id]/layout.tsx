"use client";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTabs from "../components/ProfileTabs/ProfileTabs";
import CategorySideBar from "../components/CategorySideBar";
import useWindowScroll from "@/hooks/useWindowScroll";

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isScroll = useWindowScroll(300);

    return (
        <div className="lg:max-w-5xl mx-auto xl:max-w-full">
            <ProfileHeader />

            <main className="container">
                {/* <hr className="mt-5 border-none h-[1px] w-full bg-secondary" /> */}
                <ProfileTabs />

                {/* News feed Layout */}
                <div className="flex flex-col md:flex-row">
                    {/* Category Sidebar */}
                    <CategorySideBar isScroll={isScroll} />

                    {/* News feed Area */}
                    {children}
                </div>
            </main>
        </div>
    );
}
