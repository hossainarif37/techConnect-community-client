"use client"

import UserImage from "@/components/common/UserImage";
import { navLinks } from "@/constants/navLinks";
import Link from "next/link";
import NavLink from "./NavLink/NavLink";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import CloseMenu from "@/components/common/Button/CloseMenu";
import OpenMenu from "@/components/common/Button/OpenMenu";
import { useState } from "react";
import UserMenuDropdown from "./UserMenuDropDown/UserMenuDropdown";
import useOutsideClick from "@/hooks/useOutsideClick";
import { FaUser } from "react-icons/fa";
import ActiveUserSideBar from "@/components/ActiveUserSideBar/ActiveUserSideBar";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";
import { removeUser } from "@/redux/slices/user/userSlice";
import { LuLogOut } from "react-icons/lu";
import PrimaryButton from "@/components/common/Button/PrimaryButton";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { toggleNav } from "@/redux/slices/navbar/navbarSlice";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { isNavToggle } = useSelector((state: IRootState) => state.navbarSlice);
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const router = useRouter();
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const dispatch = useDispatch();
    const [openActiveUserSidebar, setOpenActiveUserSidebar] = useState(false);
    const dropdownRef = useOutsideClick(() => setIsProfileDropdown(false),
        isProfileDropdown);

    const handleLogout = () => {
        Cookies.remove('authToken');
        dispatch(removeUser());
        router.push('/login');
    }

    return (
        <nav className="bg-[#122033] text-white p-3 lg:px-5 lg:py-5 sticky top-0 z-40">
            <div className="flex items-center">

                {/* Navbar Logo */}
                <div className="flex items-center gap-3">
                    <Link href='/' className="lg:text-3xl xl:text-4xl text-2xl font-extrabold text-transparent bg-clip-text gradient-blue">TechConnect</Link>
                </div>

                {/* Desktop Menu */}
                <div className="lg:flex hidden items-center flex-1 justify-between">
                    <ul className="flex items-center mx-auto gap-x-14">
                        {
                            navLinks?.map((link, i) => (
                                <NavLink
                                    key={i}
                                    path={link.path}
                                    title={link.title}
                                    Icon={link.icon}
                                />
                            ))
                        }

                    </ul>

                    {!user && <Link
                        className={`bg-accent flex items-center gap-2 lg:bg-transparent rounded  font-bold py-2 w-full'}`} href={'/login'}
                    >
                        <LogIn className="h-5 w-5" />
                        Login
                    </Link>}

                    <div hidden={user ? false : true} onClick={() => setIsProfileDropdown(!isProfileDropdown)} className="relative" ref={dropdownRef}>
                        <UserImage profilePicture={user?.profilePicture} className="w-12 xl:w-14 h-12 xl:h-14" />

                        {/* Profile Dropdown */}
                        {
                            isProfileDropdown && <UserMenuDropdown />
                        }
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="block lg:hidden">

                    <div className="flex gap-x-5">
                        <button
                            type="button"
                            className="text-2xl pt-2"
                            onClick={() => setOpenActiveUserSidebar(!openActiveUserSidebar)}
                        >
                            <FaUser />
                        </button>

                        {/* Navbar Menu Button */}
                        {!isNavToggle && <OpenMenu />}
                    </div>

                    <ul className={`shadow-xl z-50 bg-primary text-white absolute text-center rounded-md w-full p-5 duration-300 h-screen top-0 space-y-3 right-0 origin-right ${openActiveUserSidebar ? 'scale-x-100' : 'scale-x-0'} transition-transform`}>
                        <div className="w-full text-right">
                            <button
                                type="button"
                                className="text-3xl pt-2"
                                onClick={() => setOpenActiveUserSidebar(false)}
                            >
                                <IoMdClose />
                            </button>
                        </div>
                        <div>
                            <ActiveUserSideBar setOpenActiveUserSidebar={setOpenActiveUserSidebar} />
                        </div>
                    </ul>

                    <ul className={`shadow-xl z-50 bg-primary text-white absolute text-center rounded-md w-full p-5 duration-300 h-screen top-0 space-y-3 right-0 origin-right ${isNavToggle ? 'scale-x-100' : 'scale-x-0'}`}>

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
                                    Icon={link.icon}
                                />
                            ))
                        }

                        <li onClick={() => dispatch(toggleNav())}>
                            <Link
                                href={`/profile/${user?._id}/posts`}
                                title="Profile"
                            >
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                title="Settings"
                            >
                                Settings
                            </Link>
                        </li>
                        <PrimaryButton
                            type="button"
                            className="flex w-full items-center justify-center gap-x-2 bg-secondary"
                            title="Logout"
                            onClick={handleLogout}

                        >
                            <LuLogOut />
                            <span>Logout</span>
                        </PrimaryButton>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;