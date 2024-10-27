import { IComment } from "@/types/types";
import Link from "next/link";
import UserImage from "../common/UserImage";
import React from "react";
import { renderContentWithBr } from "@/utils/renderContentWithBr";

// Adjust the CommentCard component to accept a single `comment` prop
interface CommentCardProps {
    comment: IComment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    return (
        <div className="flex gap-x-2 mt-3">
            <Link href={`/profile/${comment?.author?._id}/posts`}>
                <UserImage className="w-14" profilePicture={comment?.author?.profilePicture} />
            </Link>
            <div className="flex-1 bg-accent p-3 rounded-xl">
                <Link
                    href={`/profile/${comment?.author?._id}/posts`} className="font-bold text-white text-lg hover:underline"
                >
                    {comment?.author?.name}
                </Link>

                {/* Render the modified content */}
                {renderContentWithBr(comment?.content)}
            </div>
        </div>
    );
};

export default CommentCard;