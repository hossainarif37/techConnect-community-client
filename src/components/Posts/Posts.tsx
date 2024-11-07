"use client";

import { usePostsQuery } from "@/redux/api/endpoints/posts/posts";
import PostCard from "./PostCard";
import LoadingRound from "../common/LoadingRound";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";

const Posts = () => {
    const searchParams = useSearchParams();
    const categories = searchParams.get('categories') || '';
    const { isLoading, isError, data, refetch } = usePostsQuery(categories); // Fetch posts from the API
    const { user } = useSelector((state: IRootState) => state.userSlice); // Get user data from Redux

    useEffect(() => {
        refetch(); // Refetch posts when user changes
    }, [user]);

    if (isLoading) {
        return <LoadingRound className="text-blue-500 text-4xl py-20" />;
    }

    if (isError) {
        return <h1 className="text-2xl text-red-500 text-center mt-10">Failed to load posts. Please try again.</h1>;
    }

    return (
        <section className="space-y-5 py-5 min-h-screen">
            {
                data?.posts?.length > 0 ? data.posts.map((post: any) => (
                    <PostCard
                        key={post._id}
                        post={post}
                    />
                )) : (
                    <h1 className="text-2xl h-screen md:h-auto font-semibold text-center mt-5 text-white">
                        No posts here. Share your thoughts!
                    </h1>
                )
            }
        </section>
    );
};

export default Posts;
