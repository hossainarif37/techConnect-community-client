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
        <div className="bg-secondary rounded-xl flex p-3 lg:p-10 gap-5">
            <UserImage className="w-16" />
            <button
                onClick={openModal}
                className="flex-1 rounded-full text-left text-lg font-semibold pl-10 bg-accent text-white  hover:bg-highlight duration-100" type="button">
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