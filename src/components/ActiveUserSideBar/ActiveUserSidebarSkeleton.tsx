"use client";

import Loading from "../common/Loading";
import SearchInput from "../common/Input/SearchInput";
import { isOdd } from "@/lib/utils";

const ActiveUserSideBarSkeleton = () => {
    return (
        <aside className="h-full md:sticky lg:top-[108px] xl:top-[116px] left-0 lg:w-[300px] xl:w-[480px] md:pl-7">
            {/* Search Input Skeleton */}
            <div className="mb-4">
                <SearchInput searchInputText="Search User" handleSearch={() => { }} />
            </div>

            {/* Users List Skeleton */}
            <div className="sidebar-scrollbar flex flex-col overflow-y-auto max-h-[calc(100vh-116px)] mt-5">
                <div className="flex flex-wrap gap-x-6 lg:gap-x-0 flex-col gap-y-1 xl:gap-y-3 pb-24 pr-2">
                    {Array.from({ length: 30 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-3 p-2.5 rounded-lg animate-pulse">
                            {/* Skeleton User Image */}
                            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>

                            {/* Skeleton User Name */}
                            <div className={`h-5 bg-gray-700 rounded ${isOdd(index) ? "w-40" : "w-60"}`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default ActiveUserSideBarSkeleton;
