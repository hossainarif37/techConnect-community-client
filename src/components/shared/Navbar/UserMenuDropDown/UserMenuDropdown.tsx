"use client"
import Link from "next/link";
import userDropdownStyles from "./userMenuDropdown.module.css"
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileDropdown } from "@/redux/slices/navbar/navbarSlice";
import { IRootState } from "@/types/types";
import Cookies from "js-cookie";
import { removeUser } from "@/redux/slices/user/userSlice";
import { LuLogOut } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Loading from "@/components/common/Loading";

const UserMenuDropdown = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.userSlice);
    if (!user) {
        return <Loading />
    }


    return (
        <>
            <ul className={`${userDropdownStyles.userProfileDropdown} `}>
                <li>
                    <Link
                        href={`/profile/${user._id}/posts`}
                        title="Profile"
                    >
                        <span><CgProfile /></span>
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="#"
                        title="Settings"
                    >
                        <span><IoSettingsOutline /></span>
                        <span>Settings</span>
                    </Link>
                </li>
                <li>
                    <button
                        type="button"
                        // id="logout-button"
                        title="Logout"
                        onClick={() => {
                            Cookies.remove('authToken');
                            dispatch(removeUser());
                        }}

                    >
                        <LuLogOut />
                        <span>Logout</span>
                    </button>
                </li>

            </ul>
        </>
    );
};

export default UserMenuDropdown;