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

interface ActiveUserSideBarProps {
    setOpenActiveUserSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
}


const ActiveUserSideBar = ({setOpenActiveUserSidebar}: ActiveUserSideBarProps) => {
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
        <aside className="h-full md:sticky lg:top-[108px] xl:top-[116px] left-0 lg:w-[300px] xl:w-[480px] md:pl-7">
            {/* Search Input */}
            <SearchInput searchInputText="Search User" handleSearch={handleSearchUser} />

            {/* Scrollable Categories Section */}
            <div className="sidebar-scrollbar flex flex-col overflow-y-auto max-h-[calc(100vh-116px)] mt-5">
                <div className="flex flex-wrap gap-x-6 lg:gap-x-0 flex-col gap-y-1 xl:gap-y-3 pb-24 pr-2">
                    {
                        data?.users?.map((user: UserType, key: number) => (
                            <Link onClick={() => setOpenActiveUserSidebar && setOpenActiveUserSidebar(false)} href={`/profile/${user?._id}/posts`} key={key} className="flex items-center gap-2 lg:gap-3 hover:bg-accent p-2.5 rounded-lg duration-150">
                                <UserImage className="w-10" />
                                <span className="text-lg xl:text-xl font-semibold select-none text-white cursor-pointer">{user.name}</span>
                            </Link>
                        ))
                    }
                </div>
            </div>

        </aside>
    );
};

export default ActiveUserSideBar;