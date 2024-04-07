"use client"

import PostCard from "@/components/Posts/PostCard";
import Loading from "@/components/common/Loading";
import { useGetPostsByUserQuery } from "@/redux/api/endpoints/posts/posts";
import { IRootState } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";



const ProfilePosts = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const searchParams = useSearchParams();
    const categories = searchParams.get('categories') || '';
    const { isLoading, isError, error, data, refetch } = useGetPostsByUserQuery({ userId: user?._id, categories });

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

export default ProfilePosts;