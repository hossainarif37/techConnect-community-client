import { IComment } from "@/types/types";
import Link from "next/link";
import UserImage from "../common/UserImage";
import React from "react";
import { renderContentWithBr } from "@/utils/renderContentWithBr";

interface CommentCardProps {
    comment: IComment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    return (
        <div className="flex gap-x-2 mt-3">
            <div className="flex-shrink-0"> {/* Add flex-shrink-0 to prevent image from shrinking */}
                <Link href={`/profile/${comment?.author?._id}/posts`}>
                    <UserImage className="w-10 lg:w-12 xl:w-14" profilePicture={comment?.author?.profilePicture} />
                </Link>
            </div>
            <div className=" bg-accent p-3 rounded-xl overflow-hidden"> {/* Add overflow-hidden */}
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
        </div>
    );
};

export default CommentCard;