"use client"

import LoginLogoutButton from "@/components/common/Button/LoginLogoutButton";
import OpenCloseButton from "@/components/common/Button/OpenCloseButton";
import UserImage from "@/components/common/UserImage";
import { navLinks } from "@/constants/navLinks";
import Link from "next/link";
import { useState } from "react";
import NavLink from "./NavLink";

const Navbar = () => {

    const [isToggle, setIstoggle] = useState(false);


    return (
        <nav className="bg-white  p-3 lg:py-5 sticky top-0 z-40 container">
            <div className="flex container justify-between items-center">

                {/* Navbar Logo */}
                <h1 className="flex items-center gap-3">
                    <UserImage />
                    <Link href='/' className="lg:text-4xl text-3xl font-bold">
                        <span className="text-gray-800">Tech</span><span className="text-secondary">Connect</span>
                    </Link>
                </h1>

                {/* Desktop Menu */}
                <div className="lg:flex hidden items-center flex-1 justify-between">
                    <ul className="flex mx-auto space-x-10">
                        {
                            navLinks?.map((link, i) => (
                                <NavLink
                                    key={i}
                                    path={link.path}
                                    title={link.title}
                                />
                            ))
                        }
                    </ul>

                    {/* Authentication Button */}
                    <LoginLogoutButton isDesktop={true} />

                </div>

                {/* Mobile Menu */}
                <div className="block lg:hidden">

                    {/* Navbar Button */}
                    <OpenCloseButton />

                    {/* Navbar Menu */}
                    <ul className={`shadow-xl  bg-white absolute text-center border-t rounded-md w-60 p-5 duration-300 h-screen top-0 space-y-3 right-0 origin-right ${isToggle ? 'scale-x-100' : 'scale-x-0'}`}>

                        {/* Navbar Menu Button */}
                        <div className="w-full text-right">
                            <OpenCloseButton />
                        </div>

                        {/* Navlinks */}
                        {
                            navLinks?.map((link, i) => (
                                <NavLink
                                    key={i}
                                    path={link.path}
                                    title={link.title}
                                />
                            ))
                        }

                        {/* Authentication Button */}
                        <LoginLogoutButton isDesktop={false} />

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;