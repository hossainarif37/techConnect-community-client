"use client"

import { toggleNav } from "@/redux/slices/navbar/navbarSlice";
import { IRootState } from "@/types/types";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const OpenCloseButton = () => {
    const { isNavToggle } = useSelector((state: IRootState) => state.navbarSlice);

    const dispatch = useDispatch();

    const handleNavToggle = () => {
        dispatch(toggleNav())
    }
    return (
        <>
            {
                !isNavToggle
                    ?

                    <button
                        type="button"
                        className="text-3xl pt-2"
                        onClick={handleNavToggle}
                    >
                        <AiOutlineMenu />
                    </button> :
                    <button
                        type="button"
                        className="text-3xl pt-2"
                        onClick={handleNavToggle}
                    >
                        <IoMdClose />
                    </button>
            }
        </>
    );
};

export default OpenCloseButton;