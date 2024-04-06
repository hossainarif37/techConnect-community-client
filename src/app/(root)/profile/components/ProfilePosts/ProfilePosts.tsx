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
    console.log(searchParams.get('categories'));
    const categories = searchParams.get('categories') || '';
    const { isLoading, isError, error, data } = useGetPostsByUserQuery({ userId: user?._id, categories });


    if (isLoading) {
        return <Loading />
    }


    return (
        <section className="lg:space-y-5 lg:py-5">
            {
                data?.posts?.map((post: any, i: number) => <PostCard
                    key={i}
                    post={post}
                />)
            }

        </section>
    );
};

export default ProfilePosts;