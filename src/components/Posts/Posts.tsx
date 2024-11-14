import { usePostsQuery } from "@/redux/api/endpoints/posts/posts";
import PostCard from "./PostCard";
import LoadingRound from "../common/LoadingRound";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";

const Posts = () => {
    const searchParams = useSearchParams();
    const containerRef = useRef(null);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<any>([]);
    const [isRefetching, setIsRefetching] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const categories = searchParams.get('categories') || '';
    const { isLoading, isError, data, refetch } = usePostsQuery({ categories, page });
    const { user } = useSelector((state: IRootState) => state.userSlice);

    const observerOptions = { threshold: 0.1 };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        if (entry.isIntersecting && data?.hasMore && !isLoading && !isLoadingMore) {
            setIsLoadingMore(true);
            setPage(prevPage => prevPage + 1);
        }else if (!data?.hasMore) {
            setIsLoadingMore(false);
        }
    };

    useEffect(()=>{
       window.scrollTo(0, 0);
    },[categories])

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
            // If there is a selected category, replace posts, otherwise accumulate posts
            setPosts((prevPosts: any) => page === 1 ? data.posts : [...prevPosts, ...data.posts]);
            setIsLoadingMore(false);
        }
    }, [data, categories, isRefetching, isLoading]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        const currentContainerRef = containerRef.current;

        if (currentContainerRef) {
            observer.observe(currentContainerRef);
        }

        return () => {
            if (currentContainerRef) observer.unobserve(currentContainerRef);
        };
    }, [containerRef, page, isLoading, isLoadingMore]);
    

    if (isLoading) {
        return <LoadingRound className="text-blue-500 text-4xl py-20" />;
    }

    if (isError) {
        return <h1 className="text-2xl text-red-500 text-center mt-10">Failed to load posts. Please try again.</h1>;
    }

    return (
        <section className="space-y-5 py-5 min-h-screen">
            {posts.length > 0 ? posts.map((post: any) => (
                <PostCard key={post._id} post={post} />
            )) : (
                <h1 className="text-2xl h-screen font-semibold text-center mt-5 text-white">
                    No posts here. Share your thoughts!
                </h1>
            )}
            <div className="text-center py-10" ref={containerRef}>
                {data?.hasMore ? <LoadingRound className="text-blue-500 text-4xl" />: 'No more posts'}
            </div>
        </section>
    );
};

export default Posts;
