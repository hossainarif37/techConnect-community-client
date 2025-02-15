"use client";

import React from "react";

const PostCardSkeleton = ({ posts }: { posts?: number }) => {
    return (
        <div className="flex flex-col gap-y-5 my-5">
            {
                [...Array(posts || 3)].map((_, index) => (
                    <div key={index} className="bg-[#122033] py-3 px-3 md:px-10 rounded-xl max-h-full w-full mx-auto md:w-[500px] xl:w-[650px] animate-pulse">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex gap-x-3 items-center">
                                {/* User Image Skeleton */}
                                <div className="w-12 lg:w-14 xl:w-16 h-12 lg:h-14 xl:h-16 bg-gray-700 rounded-full"></div>

                                {/* User Info */}
                                <div>
                                    <div className="h-4 w-32 bg-gray-700 rounded"></div>
                                    <div className="h-3 w-24 bg-gray-700 rounded mt-2"></div>
                                </div>
                            </div>
                            {/* Action Button Skeleton */}
                            <div className="w-6 h-6 bg-gray-700 rounded"></div>
                        </div>

                        {/* Content Skeleton */}
                        <div className="h-20 bg-gray-700 rounded mt-4"></div>

                        {/* Divider */}
                        <hr className="mt-5 border-none h-0.5 bg-white/10" />

                        {/* Reactions */}
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                                <div className="w-20 h-4 bg-gray-700 rounded"></div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                                <div className="w-20 h-4 bg-gray-700 rounded"></div>
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="border-none h-0.5 bg-white/10" />

                        {/* Comments Skeleton */}
                        <div className="mt-4">
                            <div className="h-12 bg-gray-700 rounded"></div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default PostCardSkeleton;
