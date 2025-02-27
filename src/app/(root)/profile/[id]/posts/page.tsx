"use client";

import PostInputCard from "@/components/common/Input/PostInputCard";
import ProfilePosts from "../../components/ProfilePosts/ProfilePosts";
import { checkOwner } from "@/utils/checkOwner";
import { IRootState } from "@/types/types";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import LoadingRound from "@/components/common/LoadingRound";
import PostCardSkeleton from "@/components/Posts/PostCardSkeleton";

const ProfilePostPage = () => {
    const params = useParams();
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const isOwner = checkOwner(params?.id as string, user?._id as string);

    return (
        <section className="flex-1 lg:pl-20 px-2 lg:px-0">
            {isOwner && <PostInputCard />}
            <Suspense fallback={<PostCardSkeleton />}>
                <ProfilePosts />
            </Suspense>
        </section>
    );
};

export default ProfilePostPage;