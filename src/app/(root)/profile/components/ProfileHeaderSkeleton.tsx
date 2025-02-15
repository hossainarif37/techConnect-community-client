import React from "react";

const ProfileHeaderSkeleton = () => {
    return (
        <section>
            {/*-------- Profile Header Skeleton Start ---------*/}
            <div className="md:w-[600px] xl:w-[750px] mx-auto flex flex-col lg:flex-row justify-center items-center animate-pulse">
                {/* Profile Photo Skeleton */}
                <div className="w-28 h-28 mb-3 rounded-full lg:mb-0 lg:w-32 lg:h-32 xl:w-48 xl:h-48 md:mr-5 bg-gray-700" />

                {/* Profile Title Area Skeleton */}
                <div className="flex justify-between gap-y-2 gap-x-12 lg:gap-y-0 items-center">
                    <div>
                        {/* Name Skeleton */}
                        <div className="h-4 w-36 bg-gray-700 rounded mb-2" />
                        {/* Followers Skeleton */}
                        <div className="h-3 w-24 bg-gray-700 rounded mb-2" />
                        {/* Following Skeleton */}
                        <div className="h-3 w-24 bg-gray-700 rounded" />
                    </div>

                    {/* Change Photo Button Skeleton */}
                    <div className="flex flex-col gap-2 lg:gap-3">
                        <div className="w-full lg:w-28 h-8 bg-gray-700 rounded-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileHeaderSkeleton;