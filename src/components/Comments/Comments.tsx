"use client";

import { useCreateCommentMutation, useLazyGetCommentsByPostIdQuery } from "@/redux/api/endpoints/comments/comments";
import CommentInput from "./CommentInput";
import CommentCard from "./CommentCard";
import { IComment, IRootState } from "@/types/types";
import LoadingRound from "../common/LoadingRound";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import UserImage from "../common/UserImage";
import { useSelector } from "react-redux";
import TempCommentCard from "./TempCommentCard";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CommentsPropsTypes = {
    postId: string;
    commentInputRef: React.RefObject<HTMLTextAreaElement>;
    latestComment: IComment | null;
    remainingComments: number;
    postAuthorId: string;
};

interface IFormValues {
    comment: string;
}

const Comments = ({ postId, commentInputRef, latestComment, remainingComments, postAuthorId }: CommentsPropsTypes) => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const { register, handleSubmit, reset } = useForm<IFormValues>();
    const [comments, setComments] = useState<IComment[]>(latestComment?.author ? [latestComment] : []);
    const [tempComment, setTempComment] = useState<IComment[]>([]);
    const [skip, setSkip] = useState(1);
    const [hasText, setHasText] = useState(false);

    const router = useRouter();

    const [getRemainingComments, { data: remainingData, isLoading: remainingLoading, isError: remainingIsError }] = useLazyGetCommentsByPostIdQuery();
    const [createComment, { isLoading: isCreateCommentLoading }] = useCreateCommentMutation();

    useEffect(() => {
        if (latestComment?.author && !comments.some(comment => comment._id === latestComment._id)) {
            setComments(prev => [latestComment, ...prev]);
        }
    }, [latestComment]);

    useEffect(() => {
        if (remainingData?.success) {
            setComments(prevComments => [...prevComments, ...remainingData.comments]);
            setSkip(prev => prev + 10);
        }
    }, [remainingData]);

    const handleViewMoreComments = () => {
        getRemainingComments({ postId, limit: 10, skip });
    };

    const handleComment: SubmitHandler<IFormValues> = (data) => {
        createComment({ content: data.comment, article: postId, author: user?._id }).unwrap().then((response) => {
            setTempComment([...tempComment, response.comment]);
            setHasText(false);
            reset();
        }).catch((err) => console.log("Comment Error:", err));
    };


    const onUserImageClick = () => {
        if (!user) {
            router.push("/login");
        }
    }

    return (
        <div>
            {(latestComment?.author || tempComment.length > 0) && (
                <>
                    {
                        (remainingData?.remainingComments ?? remainingComments) > 0 && (
                            <button
                                type="button"
                                onClick={handleViewMoreComments}
                                className="my-3 hover:underline text-[#ddd] underline text-base xl:text-lg font-bold"
                            >
                                View more comments
                            </button>
                        )
                    }

                    {/* Display Comments */}
                    <div className="comment-scrollbar max-h-[300px] overflow-y-auto pb-3 pr-3">
                        {comments.map((comment: IComment, i: number) => (
                            <CommentCard key={i} comment={comment} postAuthorId={postAuthorId} />
                        ))}
                        {tempComment.map((comment: IComment, i: number) => (
                            <TempCommentCard key={i} comment={comment} postAuthorId={postAuthorId} />
                        ))}
                    </div>

                    {
                        remainingLoading && (
                            <LoadingRound className="text-blue-primary text-4xl py-5" />
                        )
                    }
                </>
            )}

            {/* Comment Form - always visible */}
            <form
                onSubmit={handleSubmit(handleComment)}
                className="pt-3 flex gap-x-3 items-center -z-10"
            >
                <button onClick={onUserImageClick}>
                    <UserImage
                        className="w-10 h-10 lg:w-12 xl:w-14 lg:h-12 xl:h-14"
                        profilePicture={user?.profilePicture}
                    />
                </button>
                <CommentInput
                    ref={commentInputRef}
                    register={{ ...register("comment", { required: true }) }}
                    commentInputText="Write a comment..."
                    isCreateCommentLoading={isCreateCommentLoading}
                    isError={remainingIsError}
                    hasText={hasText}
                    setHasText={setHasText}
                />
            </form>
        </div>
    );
};

export default Comments;