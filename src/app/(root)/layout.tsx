import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar/Navbar";


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
            <main className="px-5 pt-5 max-w-[1920px] mx-auto">
                {children}
            </main>
        </>
    );
}
