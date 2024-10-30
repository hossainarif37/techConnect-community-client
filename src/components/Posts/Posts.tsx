"use client"

import { usePostsQuery } from "@/redux/api/endpoints/posts/posts";
import PostCard from "./PostCard";
import Loading from "../common/Loading";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import LoadingRound from "../common/LoadingRound";

const Posts = () => {
    const searchParams = useSearchParams();
    const categories = searchParams.get('categories') || '';
    const { isLoading, isError, error, data, refetch } = usePostsQuery(categories);
    const { user } = useSelector((state: IRootState) => state.userSlice);

    useEffect(() => {
        refetch();
    }, [user]);

    if (isLoading) {
        return <LoadingRound className="text-blue-500 text-4xl py-20" />
    }

    return (
        <section className="space-y-5 py-5 min-h-screen">
            {
                data?.posts?.length > 0 ? data?.posts?.map((post: any, i: number) => (
                    <PostCard
                        key={i}
                        post={post}
                    />)
                ) : <h1 className="text-2xl h-screen md:h-auto font-semibold text-center mt-5 text-white">No posts here. Share your thoughts!</h1>
            }
        </section>
    );
};

export default Posts;