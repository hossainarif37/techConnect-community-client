"use client"

import { useGetCommentsByPostIdQuery, useLazyGetCommentsByPostIdQuery } from "@/redux/api/endpoints/comments/comments";
import Loading from "../common/Loading";
import CommentInput from "./CommentInput";
import UserImage from "../common/UserImage";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CommentCard from "./CommentCard";
import { IComment } from "@/types/types";
import LoadingRound from "../common/LoadingRound";
import { useState } from "react";

type CommentsPropsTypes = {
    postId: string
}




const Comments = ({ postId }: CommentsPropsTypes) => {
    const { data, isLoading, isError, error } = useGetCommentsByPostIdQuery({ postId });
    const [getRemainingComments, { data: remainingData, isError: remainingIsError, isLoading: remainingLoading, error: remainingError }] = useLazyGetCommentsByPostIdQuery();
    const [isViewMoreComments, setIsViewMoreComments] = useState(false);
    if (isLoading) {
        return <LoadingRound />
    }

    const handleViewMoreComments = (postId: string) => {
        setIsViewMoreComments(true);
        getRemainingComments({ postId, skip: 1 });
    }

    console.log(remainingData);
    console.log(data.remainingComments)

    return (
        <div>
            {
                remainingLoading ? <LoadingRound /> : data?.remainingComments > 0 && <button
                    onClick={() => handleViewMoreComments(postId)}
                    className={
                        `${(isViewMoreComments && remainingData?.remainingComments > 1) && 'block'}
                        ${(isViewMoreComments && remainingData?.remainingComments < 2) && 'hidden'}
                        mt-3 hover:underline text-black-secondary text-lg font-bold`
                    }>View more comments</button>
            }

            {
                remainingData?.success && remainingData?.comments?.map((comment: IComment) => <CommentCard comment={comment} />
                )
            }

            {
                data?.comments?.length > 0 && data?.comments?.map((comment: IComment) => <CommentCard comment={comment} />
                )
            }

            {/* Comment Input  */}
            <CommentInput commentInputText="Write a comment..." />
        </div>
    );
};

export default Comments;