"use client";

import Link from "next/link";
import UserImage from "../common/UserImage";
import { useSelector } from "react-redux";
import { IComment, IRootState } from "@/types/types";
import { renderContentWithBr } from "@/utils/renderContentWithBr";
import CommentActionButton from "./CommentActionButton";

type TempCommentCardPropsTypes = { 
    comment: IComment;
    postAuthorId: string;
 }

const TempCommentCard = ({ comment,  postAuthorId }: TempCommentCardPropsTypes) => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    return (
        <div className="flex gap-x-2 mt-3 flex-wrap items-start">
            <div className="flex-shrink-0">
                <Link href={`/profile/${user?._id}/posts`}>
                    <UserImage className="w-10 lg:w-12 xl:w-14 h-10 lg:h-12 xl:h-14" profilePicture={user?.profilePicture} />
                </Link>
            </div>
            <div className="flex-1 bg-accent p-3 rounded-xl overflow-hidden min-w-0">
                <Link
                    href={`/profile/${user?._id}/posts`} className="font-bold text-white text-sm xl:text-lg hover:underline"
                >
                    {user?.name}
                </Link>

                <div className="break-words">
                    {renderContentWithBr(comment?.content, "text-sm xl:text-base")}
                </div>
            </div>

            {/* Include the CommentActionButton here */}
            {(user?._id === comment?.author?._id || user?._id === postAuthorId) && (
                <CommentActionButton comment={comment} postAuthorId={postAuthorId} />
            )}
        </div>
    );
};

export default TempCommentCard;