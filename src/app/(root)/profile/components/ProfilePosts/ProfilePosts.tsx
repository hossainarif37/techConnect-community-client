"use client";

import PostCard from "@/components/Posts/PostCard";
import PostCardSkeleton from "@/components/Posts/PostCardSkeleton";
import LoadingRound from "@/components/common/LoadingRound";
import usePaginationObserver from "@/hooks/usePaginationObserver";
import { useGetPostsByUserQuery } from "@/redux/api/endpoints/posts/posts";
import { IRootState } from "@/types/types";
import { checkOwner } from "@/utils/checkOwner";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfilePosts = () => {
    const params = useParams();
    const { user } = useSelector((state: IRootState) => state.userSlice);

    const isOwner = checkOwner(params?.id as string, user?._id as string);
    const searchParams = useSearchParams();
    const categories = searchParams?.get("categories") || "";

    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<any>([]);
    const [isRefetching, setIsRefetching] = useState(false);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const { data, isLoading, isError, refetch } = useGetPostsByUserQuery({
        userId: params.id,
        categories,
        page,
    });

    // Use the custom pagination observer hook
    const containerRef = usePaginationObserver({
        isLoading,
        data,
        setIsIntersecting,
        setPage,
        isIntersecting,
    });

    //  Scroll to top on category change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categories]);

    // Reset posts and pagination when categories or user changes
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

    // Append new posts to the list
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
        <section className="space-y-5 py-5">
            {posts.length > 0 ? (
                posts.map((post: any) => <PostCard key={post._id} post={post} />)
            ) : (
                <h1 className="text-2xl h-auto md:h-screen font-semibold text-center mt-5 text-black-secondary">
                    {isOwner ? "No posts here. Share your thoughts!" : "No posts found!"}
                </h1>
            )}

            <div className="text-center py-10" ref={containerRef}>
                {data?.hasMore ? (
                    <LoadingRound className="text-blue-500 text-4xl" />
                ) : (
                    "No more posts"
                )}
            </div>
        </section>
    );
};

export default ProfilePosts;
