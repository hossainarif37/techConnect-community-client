"use client"

import { useGetCommentsByPostIdQuery, useLazyGetCommentsByPostIdQuery } from "@/redux/api/endpoints/comments/comments";
import CommentInput from "./CommentInput";
import CommentCard from "./CommentCard";
import { IComment } from "@/types/types";
import LoadingRound from "../common/LoadingRound";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";

type CommentsPropsTypes = {
    postId: string
}

interface IFormValues {
    comment: string;
}

const Comments = ({ postId }: CommentsPropsTypes) => {
    const [isViewMoreComments, setIsViewMoreComments] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormValues>();

    const handleComment: SubmitHandler<IFormValues> = (data) => {
        console.log(data);
    }

    // Get latest one comment by postId
    const { data, isLoading, isError, error } = useGetCommentsByPostIdQuery({ postId });

    // Get remaining all comments by skip existing ones with the same postId
    const [getRemainingComments, { data: remainingData, isError: remainingIsError, isLoading: remainingLoading, error: remainingError }] = useLazyGetCommentsByPostIdQuery();

    if (isLoading) {
        return <LoadingRound />
    }

    const handleViewMoreComments = (postId: string) => {
        setIsViewMoreComments(true);
        getRemainingComments({ postId, skip: 1 });
    }

    return (
        <div>
            {
                remainingLoading ? <LoadingRound /> : data?.remainingComments > 0 && (
                    <button
                        onClick={() => handleViewMoreComments(postId)}
                        className={
                            `${(isViewMoreComments && remainingData?.remainingComments > 1) && 'block'}
                        ${(isViewMoreComments && remainingData?.remainingComments < 2) && 'hidden'}
                        mt-3 hover:underline text-black-secondary text-lg font-bold`
                        }>
                        View more comments
                    </button>
                )
            }

            {
                remainingData?.success && remainingData?.comments?.map((comment: IComment, i: number) => (
                    <CommentCard comment={comment} key={i} />
                ))
            }

            {
                data?.comments?.length > 0 && data?.comments?.map((comment: IComment, i: number) => <CommentCard key={i} comment={comment} />)
            }

            {/* Comment Form  */}
            <form
                onSubmit={handleSubmit(handleComment)}
                className="mt-3 flex gap-x-3"
            >
                <CommentInput
                    register={{ ...register('comment') }}
                    commentInputText="Write a comment..."
                />

                {/* Submit Button */}
                <button
                    type="submit"
                >
                    <IoMdSend />
                </button>
            </form>

        </div>
    );
};

export default Comments;