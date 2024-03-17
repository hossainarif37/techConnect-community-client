"use client"

import LoginLogoutButton from "@/components/common/Button/LoginLogoutButton";
import UserImage from "@/components/common/UserImage";
import { navLinks } from "@/constants/navLinks";
import Link from "next/link";
import NavLink from "./NavLink/NavLink";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import CloseMenu from "@/components/common/Button/CloseMenu";
import OpenMenu from "@/components/common/Button/OpenMenu";

const Navbar = () => {

    const { isNavToggle } = useSelector((state: IRootState) => state.navbarSlice);




    return (
        <nav className="bg-white  p-3 lg:py-5 sticky top-0 z-40">
            <div className="flex justify-between items-center">

                {/* Navbar Logo */}
                <div className="flex items-center gap-3">
                    {/* <UserImage customWidth="w-14" /> */}
                    <Link href='/' className="lg:text-4xl text-3xl font-bold">
                        <span className="text-gray-800">Tech</span>
                        <span className="text-secondary">Connect</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="lg:flex hidden items-center flex-1 justify-between">
                    <ul className="flex items-center mx-auto space-x-10">
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


                    <UserImage customWidth="w-14" />

                    {/* Authentication Button */}
                    {/* <LoginLogoutButton isDesktop={true} /> */}

                </div>

                {/* Mobile Menu */}
                <div className="block lg:hidden">

                    {/* Navbar Menu Button */}
                    {!isNavToggle && <OpenMenu />}

                    {/* Navbar Close Button */}
                    <ul className={`shadow-xl bg-white absolute text-center border-t rounded-md w-full p-5 duration-300 h-screen top-0 space-y-3 right-0 origin-right ${isNavToggle ? 'scale-x-100' : 'scale-x-0'}`}>

                        {/* Navbar Menu Button */}
                        <div className="w-full text-right">
                            <CloseMenu />
                        </div>

                        <hr />

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