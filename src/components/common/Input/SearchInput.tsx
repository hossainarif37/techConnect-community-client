"use client"

import { IoSearchOutline } from "react-icons/io5";

type SearchInputPropsTypes = {
    searchInputText: string,
    handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ searchInputText, handleSearch }: SearchInputPropsTypes) => {

    return (
        <div className="relative -z-10 flex items-center bg-secondary border border-accent pl-5 rounded-full">
            <span className="text-xl xl:text-3xl text-white"><IoSearchOutline /></span>
            <input
                onChange={handleSearch}
                className="input input-secondary placeholder:text-sm placeholder:md:text-base bg-transparent placeholder:text-white text-base xl:text-lg semibold border-none  rounded-full py-4" type="text" name="search" id="search" placeholder={searchInputText} />
        </div>
    );
};

export default SearchInput;