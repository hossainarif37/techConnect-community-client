"use client"

import { useState } from "react";
import UserImage from "../UserImage";
import PostModal from "../Modal/PostModal";
import { Modal } from "../Modal/Modal";

const PostInputCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-secondary rounded-xl flex p-3 lg:px-10 lg:py-5 xl:py-10 xl:px-10 gap-5 w-full mx-auto lg:w-[500px] xl:w-[650px]">
            <UserImage className="w-12 lg:w-14 xl:w-16" />
            <button
                onClick={()=>setIsModalOpen(true)}
                className="flex-1 rounded-full text-center md:text-left text-nowrap text-base md:text-lg font-semibold md:pl-10 bg-accent text-white  hover:bg-highlight duration-100" type="button">
                Share Your Experience
            </button>

            <Modal isModalOpen={isModalOpen}>
                <PostModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </Modal>

        </div>
    );
};

export default PostInputCard;