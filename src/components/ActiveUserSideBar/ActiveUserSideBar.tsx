"use client"

import { categories } from "@/constants/categories";
import { useGetAllUsersQuery } from "@/redux/api/endpoints/users/users";
import { IoIosList } from "react-icons/io";
import Loading from "../common/Loading";
import UserImage from "../common/UserImage";
import { IoSearchOutline } from "react-icons/io5";
import SearchInput from "../common/Input/SearchInput";
import Link from "next/link";

type UserType = {
    name: string;
    profilePicture: string;
}


const ActiveUserSideBar = () => {
    const { isLoading, isError, error, data } = useGetAllUsersQuery(undefined);

    return (
        <aside className="lg:w-[480px] lg:pr-10 px-3">
            {/* Search Input */}
            <SearchInput searchInputText="Search User" />

            {/* Categories Selection Input Area */}
            <div className="flex flex-wrap gap-x-6 lg:gap-x-0 lg:flex-col gap-y-7 py-5">
                {
                    data?.users?.map((user: UserType, key: number) => <div key={key}
                        className="flex items-center gap-2 lg:gap-3"
                    >
                        <UserImage customWidth="w-16" />
                        <Link href='#' className="text-lg lg:text-xl font-bold select-none text-black-secondary cursor-pointer">{user.name}</Link>
                    </div>)
                }
            </div>

        </aside>
    );
};

export default ActiveUserSideBar;