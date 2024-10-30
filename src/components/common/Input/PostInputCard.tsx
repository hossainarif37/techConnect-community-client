"use client"

import { useState } from "react";
import UserImage from "../UserImage";
import PostModal from "../Modal/PostModal";

const PostInputCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="bg-secondary rounded-xl flex p-3 lg:px-10 lg:py-5 xl:py-10 xl:px-10 gap-5">
            <UserImage className="w-14 xl:w-16" />
            <button
                onClick={openModal}
                className="flex-1 rounded-full text-center md:text-left text-nowrap text-base md:text-lg font-semibold md:pl-10 bg-accent text-white  hover:bg-highlight duration-100" type="button">
                Share Your Experience
            </button>

            <PostModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
            />

        </div>
    );
};

export default PostInputCard;