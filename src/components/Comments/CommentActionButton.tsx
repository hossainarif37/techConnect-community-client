import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Modal } from "../common/Modal/Modal";
import PrimaryButton from "../common/Button/PrimaryButton";
import { useSelector } from 'react-redux';
import { IRootState } from "@/types/types";
import EditCommentModal from "./EditCommentModal";

interface Comment {
    author: {
        _id: string;
    };
}

interface CommentActionButtonProps {
    postAuthorId: string;
    comment: Comment;
}

const CommentActionButton: React.FC<CommentActionButtonProps> = ({ postAuthorId, comment }) => {
    const [actionsDropdown, setActionsDropdown] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { user } = useSelector((state: IRootState) => state.userSlice);

    return (
        <DropdownMenu open={actionsDropdown} onOpenChange={setActionsDropdown}>
            <DropdownMenuTrigger>
                <button
                    onClick={() => setActionsDropdown(!actionsDropdown)}
                    type="button"
                    className="text-2xl cursor-pointer text-white hover:bg-accent rounded-full p-2 duration-100"
                >
                    <HiOutlineDotsHorizontal />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-highlight p-2 text-white border-none">
                {user?._id === comment?.author?._id && (
                    <>
                        <DropdownMenuItem className="cursor-pointer p-3 hover:bg-accent" onClick={() => setIsEditModalOpen(true)}>
                            <span className="text-xl"><MdModeEdit /></span>
                            <span>Edit Comment</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer p-3 hover:bg-accent" onClick={() => setIsDeleteModalOpen(true)}>
                            <span className="text-xl"><RiDeleteBin6Line /></span>
                            <span>Delete Comment</span>
                        </DropdownMenuItem>
                    </>
                )}
                {postAuthorId === user?._id && user?._id !== comment?.author?._id && (
                    <DropdownMenuItem onClick={() => setIsDeleteModalOpen(true)}>
                        <span className="text-xl"><RiDeleteBin6Line /></span>
                        <span>Delete Comment</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>

            {/* Edit Comment Modal */}
            <Modal isModalOpen={isEditModalOpen} contentClassName="xl:w-[500px]">
                <EditCommentModal comment={comment} isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isModalOpen={isDeleteModalOpen}>
                <div className="w-full flex flex-col gap-5">
                    <h1 className="text-2xl">Are you sure you want to delete this comment?</h1>
                    <div className="flex justify-end gap-x-5">
                        <PrimaryButton onClick={() => setIsDeleteModalOpen(false)}>No</PrimaryButton>
                        <PrimaryButton className="bg-red-500 py-2 hover:bg-red-400" onClick={() => {/* handle delete logic */ }}>
                            {false ? "Deleting..." : "Yes"}
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </DropdownMenu>
    );
};

export default CommentActionButton;
