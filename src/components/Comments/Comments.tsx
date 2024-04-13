"use client"

import { useGetCommentsByPostIdQuery } from "@/redux/api/endpoints/comments/comments";
import Loading from "../common/Loading";

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
        </div>
    );
};

export default Comments;