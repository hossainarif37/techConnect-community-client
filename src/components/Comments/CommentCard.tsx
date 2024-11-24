"use client";
import { IComment, IRootState } from "@/types/types";
import Link from "next/link";
import UserImage from "../common/UserImage";
import React from "react";
import { renderContentWithBr } from "@/utils/renderContentWithBr";
import CommentActionButton from "./CommentActionButton"; // Import your action button component
import { useSelector } from "react-redux";

interface CommentCardProps {
    comment: IComment;
    postAuthorId: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, postAuthorId }) => {
    const { user } = useSelector((state: IRootState) => state.userSlice);

    return (
        <div className="flex gap-x-2 mt-3 flex-wrap items-start">
            <div className="flex-shrink-0">
                <Link href={`/profile/${comment?.author?._id}/posts`}>
                    <UserImage className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14" profilePicture={comment?.author?.profilePicture} />
                </Link>
            </div>
            <div className="flex-1 bg-accent p-3 rounded-xl overflow-hidden min-w-0">
                <Link
                    href={`/profile/${comment?.author?._id}/posts`}
                    className="font-bold text-white text-sm xl:text-lg hover:underline"
                >
                    {comment?.author?.name}
                </Link>
                <div>
                    {renderContentWithBr(comment?.content, 'text-sm xl:text-base')}
                </div>
            </div>
            {/* Include the CommentActionButton here */}
            {(user?._id === comment?.author?._id || user?._id === postAuthorId) && (
                <CommentActionButton comment={comment} postAuthorId={postAuthorId} />
            )}

        </div>
    );
};

export default CommentCard;
