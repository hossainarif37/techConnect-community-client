"use client"

import { use, useState } from "react";
import UserImage from "../UserImage";
import PostModal from "../Modal/PostModal";
import { Modal } from "../Modal/Modal";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import { useRouter } from "next/navigation";

const PostInputCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const router = useRouter();
    const handleModalOpen = () => {
        if (!user) {
            router.push("/login");
            return;
        }
        setIsModalOpen(true)
    }

    const onUserImageClick = () => {
        if (!user) {
            router.push("/login");
            return;
        }
        router.push(`/profile/${user._id}/posts`);
    }

    return (
        <div className="bg-secondary rounded-xl flex p-3 lg:px-10 lg:py-5 xl:py-10 xl:px-10 gap-5 w-full mx-auto lg:w-[500px] xl:w-[650px]">
            <button onClick={onUserImageClick}>
                <UserImage profilePicture={user?.profilePicture} className="w-12 lg:w-14 xl:w-16 h-12 lg:h-14 xl:h-16" />
            </button>
            <button
                onClick={handleModalOpen}
                className="flex-1 rounded-full text-center md:text-left text-nowrap text-xs md:text-lg font-semibold md:pl-10 bg-accent text-white  hover:bg-highlight duration-100" type="button">
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