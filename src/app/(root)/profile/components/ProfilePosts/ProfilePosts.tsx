"use client"

import PostCard from "@/components/Posts/PostCard";
import Loading from "@/components/common/Loading";
import LoadingRound from "@/components/common/LoadingRound";
import usePaginationObserver from "@/hooks/usePaginationObserver";
import { useGetPostsByUserQuery } from "@/redux/api/endpoints/posts/posts";
import { IRootState } from "@/types/types";
import { checkOwner } from "@/utils/checkOwner";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



const ProfilePosts = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const searchParams = useSearchParams();
    const params = useParams();
    const isOwner = checkOwner(params?.id as string, user?._id as string);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<any>([]);
    const [isRefetching, setIsRefetching] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const categories = searchParams.get('categories') || '';
    const { isLoading, isError, error, data, refetch } = useGetPostsByUserQuery({ userId: params.id, categories, page });
    // Pagination observer hook
    const containerRef = usePaginationObserver({ data, page, isLoading, setIsLoadingMore, setPage, isLoadingMore });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categories])

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
            setIsLoadingMore(false);
        });
    }, [categories, user, refetch]);
    useEffect(() => {
        if (data?.posts?.length > 0 && !isRefetching && !isLoading) {
            setPosts((prevPosts: any) => page === 1 ? data.posts : [...prevPosts, ...data.posts]);
            setIsLoadingMore(false);
        }
    }, [data, categories, isRefetching, isLoading]);


    useEffect(() => {
        refetch();
    }, [params]);

    if (isLoading) {
        return <LoadingRound className="text-blue-primary text-4xl py-20" />
    }
    if (isLoading) {
        return <LoadingRound className="text-blue-500 text-4xl py-20" />;
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
            {
                posts.length > 0 ? posts.map((post: any) => (
                    <PostCard key={post._id} post={post} />
                )) : (
                    <h1 className="text-2xl h-auto md:h-screen font-semibold text-center mt-5 text-black-secondary">
                        {isOwner ? 'No posts here. Share your thoughts!' : 'No posts found!'}
                    </h1>
                )
            }
            <div className="text-center py-10" ref={containerRef}>
                {data?.hasMore ? <LoadingRound className="text-blue-500 text-4xl" /> : 'No more posts'}
            </div>
        </section>
    );
};

export default ProfilePosts;