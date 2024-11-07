"use client";

import { BsBookmarkPlusFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import { useState } from "react";
import postCardStyles from './postcard.module.css';
import { FaWindowClose } from "react-icons/fa";
import EditPostModal from "../common/Modal/EditPostModal";
import { Modal } from "../common/Modal/Modal";

interface PostActionsDropdownProps {
    authorId: string;
    setActionsDropdown: React.Dispatch<React.SetStateAction<boolean>>;
    post: any;
}

const PostActionsDropdown = ({ setActionsDropdown, authorId, post }: PostActionsDropdownProps) => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const [isEditing, setIsEditing] = useState(false);

    const handleSavePost = () => setActionsDropdown(false);
    const handleDeletePost = () => setActionsDropdown(false);
    const handleFollow = () => setActionsDropdown(false);
    const handleUnfollow = () => setActionsDropdown(false);

   

    return (
        <>
            <ul className={postCardStyles.postActionsDropdown}>
                <li>
                    <button onClick={handleSavePost}>
                        <span className="text-xl"><BsBookmarkPlusFill /></span>
                        <span>Save Post</span>
                    </button>
                </li>
                {user?._id === authorId ? (
                    <>
                        <li>
                            <button onClick={() => setIsEditing(true)}>
                                <span className="text-xl"><MdModeEdit /></span>
                                <span>Edit Post</span>
                            </button>


                        </li>
                        <li>
                            <button onClick={handleDeletePost}>
                                <span className="text-xl"><RiDeleteBin6Line /></span>
                                <span>Delete Post</span>
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <button onClick={handleFollow}>
                                <span className="text-xl"><FaRegSquarePlus /></span>
                                <span>Follow</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={handleUnfollow}>
                                <span className="text-xl"><FaWindowClose /></span>
                                <span>Unfollow</span>
                            </button>
                        </li>
                    </>
                )}
            </ul>


            <Modal isModalOpen={isEditing}>
                <EditPostModal
                    isModalOpen={isEditing} setIsModalOpen={setIsEditing} post={post} setActionsDropdown={setActionsDropdown}
                />
            </Modal>
        </>
    );
};

export default PostActionsDropdown;