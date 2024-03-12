"use client"

import { toggleNav } from "@/redux/slices/navbar/navbarSlice";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch } from "react-redux";

const OpenMenu = () => {
    const dispatch = useDispatch();

    const handleNavToggle = () => {
        dispatch(toggleNav())
    }

    return (
        <button
            type="button"
            className="text-3xl pt-2"
            onClick={handleNavToggle}
        >
            <AiOutlineMenu />
        </button>
    );
};

export default OpenMenu;