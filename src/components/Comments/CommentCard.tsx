import { IComment } from "@/types/types";
import Link from "next/link";
import UserImage from "../common/UserImage";
import React from "react";
import { renderContentWithBr } from "@/utils/renderContentWithBr";
import CommentActionButton from "./CommentActionButton"; // Import your action button component

interface CommentCardProps {
    comment: IComment;
    postAuthorId: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, postAuthorId }) => {
    return (
        <div className="flex gap-x-2 mt-3 flex-wrap items-start">
            <div className="flex-shrink-0">
                <Link href={`/profile/${comment?.author?._id}/posts`}>
                    <UserImage className="w-10 lg:w-12 xl:w-14" profilePicture={comment?.author?.profilePicture} />
                </Link>
            </div>
            <div className="flex-1 bg-accent p-3 rounded-xl overflow-hidden min-w-0">
                <Link
                    href={`/profile/${comment?.author?._id}/posts`}
                    className="font-bold text-white text-lg hover:underline"
                >
                    {comment?.author?.name}
                </Link>
                <div>
                    {renderContentWithBr(comment?.content)}
                </div>
            </div>
            {/* Include the CommentActionButton here */}
            <CommentActionButton comment={comment} postAuthorId={postAuthorId} />
        </div>
    );
};

export default CommentCard;
