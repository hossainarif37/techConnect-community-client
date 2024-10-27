"use client"

import { useState, useEffect } from "react";
import { IoIosList } from "react-icons/io";
import { categories } from "@/constants/categories";
import SearchInput from "@/components/common/Input/SearchInput";

const CategorySideBar = () => {
    const [categoryQueries, setCategoryQueries] = useState<string[]>([]);
    const [searchInputValue, setSearchInputValue] = useState('');

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
            if (categoryQueries.length > 0) {
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
        <aside className="h-full sticky top-[116px] left-0 md:min-w-[480px] lg:pr-10 px-3 lg:px-0">
        <SearchInput searchInputText="Search Category" handleSearch={handleSearchCategory} />
    
        {/* Scrollable Categories Section */}
        <div className="sidebar-scrollbar flex flex-col overflow-y-auto max-h-[calc(100vh-116px)] mt-5">
            <div className="flex flex-wrap gap-x-6 lg:gap-x-0 lg:flex-col gap-y-3 pb-24 pr-2">
                {
                    filteredCategories?.map((category: string, key: number) => (
                        <label htmlFor={category.toLowerCase()} key={key} className="flex gap-2 lg:gap-3 hover:bg-accent hover:cursor-pointer p-3 rounded-lg duration-150">
                            <input
                                onChange={(e) => handleCategory(category, e.target.checked)}
                                className="h-7 w-7 cursor-pointer"
                                type="checkbox"
                                name="category"
                                id={category.toLowerCase()}
                                checked={categoryQueries.includes(category)} // Determine if the category is selected
                            />
                            <span
                                className="text-lg lg:text-xl select-none text-white cursor-pointer"
                                
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