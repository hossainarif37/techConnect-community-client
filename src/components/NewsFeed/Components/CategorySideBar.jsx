import { IoIosList } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { categories } from "../../../assets/data/data";

const CatergorySideBar = () => {

    return (
        <div className="lg:w-[480px] lg:pr-10 px-3 lg:px-0">
            <div className="flex items-center gap-2 pb-3">
                <span className="text-4xl"><IoIosList /></span> <h3 className="font-bold text-black-secondary">Select Categories</h3>
            </div>
            <div className="relative flex items-center bg-white-secondary pl-5 rounded-full">
                <span className="text-3xl text-black-secondary"><IoSearchOutline /></span>
                <input className="input input-secondary bg-transparent placeholder:text-black-secondary text-lg placeholder:font-semibold border-none  rounded-full py-4" type="text" name="search" id="search" placeholder="Search Category" />
            </div>
            <div className="flex flex-wrap gap-x-6 lg:gap-x-0 lg:flex-col gap-y-7 py-5">
                {
                    categories.map((category, key) => <div key={key}
                        className="flex gap-2 lg:gap-3"
                    >
                        <input className="h-7 w-7 cursor-pointer" type="checkbox" name="" id={category.toLowerCase()} />
                        <label className="text-lg lg:text-xl font-bold select-none text-black-secondary cursor-pointer" htmlFor={category.toLowerCase()}>{category}</label>
                    </div>)
                }
            </div>
        </div>
    );
};

export default CatergorySideBar;