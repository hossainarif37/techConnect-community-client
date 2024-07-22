"use client"

import { useCreateCommentMutation, useGetCommentsByPostIdQuery, useLazyGetCommentsByPostIdQuery } from "@/redux/api/endpoints/comments/comments";
import CommentInput from "./CommentInput";
import CommentCard from "./CommentCard";
import { IComment, IRootState, IUser } from "@/types/types";
import LoadingRound from "../common/LoadingRound";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import UserImage from "../common/UserImage";
import { useSelector } from "react-redux";
import TempCommentCard from "./TempCommentCard";

type CommentsPropsTypes = {
    postId: string
}

interface IFormValues {
    comment: string;
}


const Comments = ({ postId }: CommentsPropsTypes) => {
    const [isViewMoreComments, setIsViewMoreComments] = useState(false);
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormValues>();
    const [tempComment, setTempComment] = useState<string[]>([]);




    // Get latest one comment by postId
    const { data, isLoading, isError, error } = useGetCommentsByPostIdQuery({ postId });

    // Create a new comment
    const [createComment, { data: createCommentData, isError: isCreateCommentError, error: createCommentError, isLoading: isCreateCommentLoading }] = useCreateCommentMutation();
    const [hasText, setHasText] = useState(false);

    // Get remaining all comments by skip existing ones with the same postId
    const [getRemainingComments, { data: remainingData, isError: remainingIsError, isLoading: remainingLoading, error: remainingError }] = useLazyGetCommentsByPostIdQuery();

    if (isLoading) {
        return <LoadingRound paddingY="py-4" />
    }

    const handleViewMoreComments = (postId: string) => {
        setIsViewMoreComments(true);
        getRemainingComments({ postId, skip: 1 });
    }


    const handleComment: SubmitHandler<IFormValues> = (data) => {
        setTempComment([...tempComment, data.comment]);
        createComment({ content: data.comment, article: postId, author: user?._id });
        setHasText(false);
        reset();
    }

    console.log(createCommentData);

    return (
        <div className="">
            {
                remainingLoading ? <LoadingRound paddingY="py-4" /> : data?.remainingComments > 0 && (
                    <button
                        type="button"
                        onClick={() => handleViewMoreComments(postId)}
                        className={
                            `${(isViewMoreComments && remainingData?.remainingComments > 1) && 'block'}
                        ${(isViewMoreComments && remainingData?.remainingComments < 2) && 'hidden'}
                        my-3 hover:underline text-black-secondary text-lg font-bold`
                        }>
                        View more comments
                    </button>
                )
            }

            <div className="max-h-[300px] overflow-y-auto pb-3">
                {
                    remainingData?.success && remainingData?.comments?.map((comment: IComment, i: number) => (
                        <CommentCard comment={comment} key={i} />
                    ))
                }

                {
                    data?.comments?.length > 0 && data?.comments?.map((comment: IComment, i: number) => <CommentCard key={i} comment={comment} />)
                }

                {
                    tempComment.map((comment: string, i: number) => (
                        <TempCommentCard key={i}
                            comment={comment}
                        />
                    ))
                }
            </div>

            {/* Comment Form  */}
            <form
                onSubmit={handleSubmit(handleComment)}
                className="pt-3 flex gap-x-3 border-t"
            >
                <UserImage customWidth="w-14" profilePicture={user?.profilePicture} />
                <CommentInput
                    register={{ ...register('comment', { required: true }) }}
                    commentInputText="Write a comment..."
                    isCreateCommentLoading={isCreateCommentLoading}
                    isError={isError}
                    hasText={hasText}
                    setHasText={setHasText}
                />
            </form>

        </div>
    );
};

export default Comments;