import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import Navbar from "@/components/shared/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

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

            <main>
                {children}
            </main>
        </>

    );
}
