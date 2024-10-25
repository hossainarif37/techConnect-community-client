"use client"

import { IoSearchOutline } from "react-icons/io5";

type SearchInputPropsTypes = {
    searchInputText: string,
    handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ searchInputText, handleSearch }: SearchInputPropsTypes) => {

    return (
        <div className="relative flex items-center bg-secondary border border-accent pl-5 rounded-full">
            <span className="text-3xl text-white"><IoSearchOutline /></span>
            <input
                onChange={handleSearch}
                className="input input-secondary bg-transparent placeholder:text-white text-lg semibold border-none  rounded-full py-4" type="text" name="search" id="search" placeholder={searchInputText} />
        </div>
    );
};

export default SearchInput;