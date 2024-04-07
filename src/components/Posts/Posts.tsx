"use client"

import { usePostsQuery } from "@/redux/api/endpoints/posts/posts";
import PostCard from "./PostCard";
import Loading from "../common/Loading";
import { useSearchParams } from "next/navigation";

const Posts = () => {
    const searchParams = useSearchParams();
    const categories = searchParams.get('categories') || '';
    const { isLoading, isError, error, data, refetch } = usePostsQuery(categories);

    if (isLoading) {
        return <Loading />
    }

    return (
        <section className="lg:space-y-5 lg:py-5">
            {
                data?.posts?.length > 0 ? data?.posts?.map((post: any, i: number) => <PostCard
                    key={i}
                    post={post}
                />) : <h1 className="text-2xl font-semibold text-center mt-5 text-black-secondary">No posts here. Share your thoughts!</h1>
            }

        </section>
    );
};

export default Posts;