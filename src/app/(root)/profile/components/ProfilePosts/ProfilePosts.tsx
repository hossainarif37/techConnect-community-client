"use client"

import PostCard from "@/components/Posts/PostCard";
import Loading from "@/components/common/Loading";
import LoadingRound from "@/components/common/LoadingRound";
import { useGetPostsByUserQuery } from "@/redux/api/endpoints/posts/posts";
import { IRootState } from "@/types/types";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";



const ProfilePosts = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const searchParams = useSearchParams();
    const params = useParams();

    const categories = searchParams.get('categories') || '';
    const { isLoading, isError, error, data, refetch } = useGetPostsByUserQuery({ userId: params.id, categories });


    useEffect(() => {
        refetch();
    }, [params]);

    if (isLoading) {
        return <LoadingRound className="text-blue-primary text-4xl py-20"/>
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

export default ProfilePosts;