"use client";

import usePaginationObserver from "@/hooks/usePaginationObserver";
import LoadingRound from "../common/LoadingRound";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import { usePostsQuery } from "@/redux/api/endpoints/posts/posts";
import { useSearchParams } from "next/navigation";
import PostCardSkeleton from "./PostCardSkeleton";

const Posts = () => {
    const searchParams = useSearchParams();
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<any>([]);
    const [isRefetching, setIsRefetching] = useState(false);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const categories = searchParams.get("categories") || "";
    const { isLoading, isError, data, refetch } = usePostsQuery({ categories, page });
    const { user } = useSelector((state: IRootState) => state.userSlice);

    // Use the custom pagination observer hook
    const containerRef = usePaginationObserver({
        isLoading,
        data,
        setIsIntersecting,
        setPage,
        isIntersecting,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categories]);

    useEffect(() => {
        if (categories) {
            setPosts([]);
            setPage(1);
        } else {
            setPosts([]);
            setPage(1);
        }
        setIsRefetching(true);
        refetch().finally(() => {
            setIsRefetching(false);
            setIsIntersecting(false);
        });
    }, [categories, user, refetch]);

    useEffect(() => {
        if (data?.posts?.length > 0 && !isRefetching && !isLoading) {
            setPosts((prevPosts: any) => (page === 1 ? data.posts : [...prevPosts, ...data.posts]));
            setIsIntersecting(false);
        }
        if (data?.posts?.length === 0 && !isRefetching && !isLoading) {
            setPosts([]);
            setIsIntersecting(false);
        }
    }, [data, categories, isRefetching, isLoading]);

    if (isLoading) {
        return <PostCardSkeleton />;
    }

    if (isError) {
        return (
            <h1 className="text-2xl text-red-500 text-center mt-10">
                Failed to load posts. Please try again.
            </h1>
        );
    }

    return (
        <section className="space-y-5 py-5 min-h-screen">
            {posts.length > 0 ? (
                posts.map((post: any) => <PostCard key={post._id} post={post} />)
            ) : (
                <h1 className="text-2xl h-screen font-semibold text-center mt-5 text-white">
                    No posts here. Share your thoughts!
                </h1>
            )}
            <div className="text-center" ref={containerRef}>
                {data?.hasMore ? (
                    <PostCardSkeleton posts={1} />
                ) : (
                    "No more posts"
                )}
            </div>
        </section>
    );
};

export default Posts;
