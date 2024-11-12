"use client"

import { useState, useEffect } from "react";
import { IoIosList } from "react-icons/io";
import { categories } from "@/constants/categories";
import SearchInput from "@/components/common/Input/SearchInput";
import { usePathname } from "next/navigation";
interface CategorySideBarProps {
    isScroll?: boolean;
}

const CategorySideBar = ({isScroll}:CategorySideBarProps) => {
    const [categoryQueries, setCategoryQueries] = useState<string[]>([]);
    const [searchInputValue, setSearchInputValue] = useState('');
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    const handleCategory = (category: string, isChecked: boolean) => {
        let newQueries = [...categoryQueries];
        if (isChecked) {
            newQueries.push(category);
        } else {
            newQueries = newQueries.filter(c => c !== category);
        }
        setCategoryQueries(newQueries);
    };

    const filteredCategories = categories.filter(c => c.toLowerCase().includes(searchInputValue.toLowerCase()));

    const handleSearchCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value);
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            if (categoryQueries?.length > 0) {
                // If there are categories selected, update the URL with the new categories
                const newQueries = categoryQueries.join(',');
                searchParams.set('categories', newQueries);
            } else {
                // If there are no categories selected, remove the 'categories' parameter from the URL
                searchParams.delete('categories');
            }
            window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
        }
    }, [categoryQueries]);

    return (
        <aside className={`bg-primary ${!isHomePage && 'border-r border-black/15'} z-10 h-full sticky top-[60px] ${isScroll && 'pt-5 duration-300' || isHomePage && 'pt-5'} lg:pt-0 xl:pt-0 lg:top-[108px] xl:top-[116px] left-0 xl:w-[480px] lg:w-[300px] lg:pr-10 pb-2 md:pb-0 px-3 lg:px-0`}>
        <SearchInput searchInputText="Search Category" handleSearch={handleSearchCategory} />
    
        {/* Scrollable Categories Section */}
        <div className="sidebar-scrollbar flex flex-col overflow-y-auto max-h-[calc(100vh-116px)] md:mt-5">
            <div className="flex md:flex-wrap flex-nowrap my-2 flex-row gap-x-6 md:gap-x-0 md:flex-col gap-y-1 xl:gap-y-3 pb-0 md:pb-24 pr-2">
                {
                    filteredCategories?.map((category: string, key: number) => (
                        <label htmlFor={category.toLowerCase()} key={key} className="flex gap-2 items-center lg:gap-3 hover:bg-accent hover:cursor-pointer py-1 px-2 md:p-3 rounded-lg duration-150">
                            <input
                                onChange={(e) => handleCategory(category, e.target.checked)}
                                className="lg:h-5 lg:w-5 xl:h-7 xl:w-7 cursor-pointer"
                                type="checkbox"
                                name="category"
                                id={category.toLowerCase()}
                                checked={categoryQueries?.includes(category)} // Determine if the category is selected
                            />
                            <span
                                className="text-lg xl:text-xl text-nowrap select-none text-white cursor-pointer"
                                
                            >
                                {category}
                            </span>
                        </label>
                    ))
                }
            </div>
        </div>
    </aside>
    

    );
}

export default CategorySideBar;