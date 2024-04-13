"use client"

import { useGetCommentsByPostIdQuery } from "@/redux/api/endpoints/comments/comments";
import Loading from "../common/Loading";
import CommentInput from "./CommentInput";

type CommentsPropsTypes = {
    articleId: string
}

const Comments = ({ articleId }: CommentsPropsTypes) => {
    const { data: comments, isLoading, isError, error } = useGetCommentsByPostIdQuery(articleId);
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            Comments

            {/* Comment Input  */}
            <CommentInput commentInputText="Write a comment..." />
        </div>
    );
};

export default Comments;