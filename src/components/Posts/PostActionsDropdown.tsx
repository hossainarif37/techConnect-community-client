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
import { useDeletePostMutation } from "@/redux/api/endpoints/posts/posts";
import toast from "react-hot-toast";
import PrimaryButton from "../common/Button/PrimaryButton";

interface PostActionsDropdownProps {
    authorId: string;
    setActionsDropdown: React.Dispatch<React.SetStateAction<boolean>>;
    post: any;
}

const PostActionsDropdown = ({ setActionsDropdown, authorId, post }: PostActionsDropdownProps) => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const [isEditing, setIsEditing] = useState(false);
    const [deletePost] = useDeletePostMutation();
    const [isDeleteAlert, setIsDeleteAlert] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSavePost = () => setActionsDropdown(false);
    const handleDeletePost = () => {
        setIsDeleting(true);

        deletePost(post._id).unwrap().then(() => {
            setTimeout(() => {
                toast.success("Post deleted successfully");
            }, 1000);
        }).catch((err) => {
            console.log("Delete Post Error:", err);
            toast.error("Post delete failed");
        }).finally(() => {
            setIsDeleting(false);
            setActionsDropdown(false);
            setIsDeleteAlert(false);
        })
    };
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
                            <button onClick={() => setIsDeleteAlert(true)}>
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
                        {/* <li>
                            <button onClick={handleUnfollow}>
                                <span className="text-xl"><FaWindowClose /></span>
                                <span>Unfollow</span>
                            </button>
                        </li> */}
                    </>
                )}
            </ul>

            {/* Edit Post Modal */}
            <Modal isModalOpen={isEditing}>
                <EditPostModal
                    isModalOpen={isEditing} setIsModalOpen={setIsEditing} post={post} setActionsDropdown={setActionsDropdown}
                />
            </Modal>


            {/* Delete alert */}
            <Modal isModalOpen={isDeleteAlert}>
                <div className="w-full flex flex-col gap-5">
                    <h1 className="text-2xl">Are you sure you want to delete this post?</h1>

                    <div className="flex justify-end gap-x-5">
                        <PrimaryButton className="bg-primary hover:bg-secondary py-2" onClick={() => setIsDeleteAlert(false)}>No</PrimaryButton>

                        <PrimaryButton className="bg-red-500 py-2 hover:bg-red-400" onClick={handleDeletePost}>{isDeleting ? "Deleting..." : "Yes"}</PrimaryButton>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default PostActionsDropdown;