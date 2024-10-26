"use client"

import { categories } from "@/constants/categories";
import { useGetAllUsersQuery } from "@/redux/api/endpoints/users/users";
import { IoIosList } from "react-icons/io";
import Loading from "../common/Loading";
import UserImage from "../common/UserImage";
import { IoSearchOutline } from "react-icons/io5";
import SearchInput from "../common/Input/SearchInput";
import Link from "next/link";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import { useEffect, useState } from "react";

type UserType = {
    _id: string;
    name: string;
    profilePicture: string;
}


const ActiveUserSideBar = () => {
    const [searchInputValue, setSearchInputValue] = useState('');
    const { isLoading, isError, error, data, refetch } = useGetAllUsersQuery(searchInputValue);


    const { user } = useSelector((state: IRootState) => state.userSlice);

    const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value);
    }

    useEffect(() => {
        refetch();
    }, [user]);

    console.log(36, data);

    return (
        <aside className="h-full sticky top-[116px] left-0 md:min-w-[480px] pl-7">
            {/* Search Input */}
            <SearchInput searchInputText="Search User" handleSearch={handleSearchUser} />

            {/* Scrollable Categories Section */}
            <div className="scrollbar-style flex flex-col overflow-y-auto max-h-[calc(100vh-116px)] mt-5">
                <div className="flex flex-wrap gap-x-6 lg:gap-x-0 lg:flex-col gap-y-5 pb-24">
                    {
                        data?.users?.map((user: UserType, key: number) => <div key={key}
                            className="flex items-center gap-2 lg:gap-3"
                        >
                            <UserImage className="w-12" />
                            <Link href={`/profile/${user?._id}/posts`} className="text-lg lg:text-xl font-semibold select-none text-white cursor-pointer">{user.name}</Link>
                        </div>)
                    }
                </div>
            </div>

        </aside>
    );
};

export default ActiveUserSideBar;