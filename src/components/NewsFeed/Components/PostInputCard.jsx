import { useState } from "react";
import PostInputModal from "../../common/PostInputModal";
import CustomModal from "../../common/CustomModal";
import UserImage from "../../common/UserImage";

const PostInputCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="bg-white rounded-xl flex p-3 lg:p-10 gap-5">
            <UserImage modal={true} />
            <button
                onClick={openModal}
                className="flex-1 rounded-full text-left text-lg font-semibold pl-10 text-black-secondary bg-white-secondary hover:bg-gray-secondary duration-100" type="button">Share Your Experience</button>
            {/* <PostInputModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
            /> */}
            <CustomModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
            />

        </div>
    );
};

export default PostInputCard;