"use client"

import { toggleNav } from "@/redux/slices/navbar/navbarSlice";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";

const CloseMenu = () => {
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
            <IoMdClose />
        </button>
    );
};

export default CloseMenu;