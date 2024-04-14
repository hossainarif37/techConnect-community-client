"use client"

import { useGetCommentsByPostIdQuery } from "@/redux/api/endpoints/comments/comments";
import Loading from "../common/Loading";
import CommentInput from "./CommentInput";
import UserImage from "../common/UserImage";
import Link from "next/link";

type CommentsPropsTypes = {
    articleId: string
}

interface IComment {
    _id: string;
    content: string;
    author: {
        _id: string;
        name: string;
        profilePicture: string;
    };
    article: string;
    createdAt: string;
}


const Comments = ({ articleId }: CommentsPropsTypes) => {
    const { data, isLoading, isError, error } = useGetCommentsByPostIdQuery(articleId);
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            {data?.totalComments > 1 && <button className="mt-3 hover:underline text-black-secondary text-lg font-bold">View more comments</button>}

            {
                data?.comments?.length > 0 && data?.comments?.map((comment: IComment) => (
                    <div className="flex gap-x-2 mt-3">
                        <Link href={`/profile/${comment.author._id}/posts`}>
                            <UserImage customWidth="w-14" profilePicture={comment.author.profilePicture} />
                        </Link>
                        <div className="bg-white-secondary p-3 rounded-xl">
                            <Link href={`/profile/${comment.author._id}/posts`} className="font-bold">{comment.author.name}</Link>
                            <p>{comment.content}</p>
                        </div>
                    </div>)
                )
            }

            {/* Comment Input  */}
            <CommentInput commentInputText="Write a comment..." />
        </div>
    );
};

export default Comments;