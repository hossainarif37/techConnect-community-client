"use client"

import { usePostsQuery } from "@/redux/api/endpoints/posts/posts";
import PostCard from "./PostCard";
import Loading from "../common/Loading";

const Posts = () => {
    const { isLoading, isError, data: posts } = usePostsQuery(undefined);

    if (isLoading) {
        return <Loading />
    }

    const { author, name } = posts;

    return (
        <section className="lg:space-y-5 lg:py-5">
            {
                posts?.map((post: any, i: number) => <PostCard
                    key={i}
                    post={post}
                    name={name}
                    profilePicture={author?.profilePicture}
                />)
            }

        </section>
    );
};

export default Posts;