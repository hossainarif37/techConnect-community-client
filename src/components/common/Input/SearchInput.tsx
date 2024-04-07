import { IoSearchOutline } from "react-icons/io5";

type SearchInputPropsTypes = { searchInputText: string }

const SearchInput = ({ searchInputText }: SearchInputPropsTypes) => {
    return (
        <div className="relative flex items-center bg-white-secondary pl-5 rounded-full">
            <span className="text-3xl text-black-secondary"><IoSearchOutline /></span>
            <input className="input input-secondary bg-transparent placeholder:text-black-secondary text-lg placeholder:font-semibold border-none  rounded-full py-4" type="text" name="search" id="search" placeholder={searchInputText} />
        </div>
    );
};

export default SearchInput;