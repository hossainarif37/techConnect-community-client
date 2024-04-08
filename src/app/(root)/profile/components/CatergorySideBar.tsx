"use client"

import { useState, useEffect } from "react";
import { IoIosList } from "react-icons/io";
import { categories } from "@/constants/categories";
import SearchInput from "@/components/common/Input/SearchInput";

const CatergorySideBar = () => {
    const [categoryQueries, setCategoryQueries] = useState<string[]>([]);
    const [searchInputValue, setSearchInputValue] = useState('');

    const handleCategory = (category: string, isChecked: boolean) => {
        let newQueries = [...categoryQueries];
        if (isChecked) {
            newQueries.push(category);
        } else {
            newQueries = newQueries.filter(c => c !== category);
        }
        console.log('newQueries', newQueries);
        setCategoryQueries(newQueries);
        console.log('isChecked', isChecked);
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

    console.log('categoryQueries: ', categoryQueries);
    console.log('filteredCategories: ', filteredCategories);

    return (
        <aside className="lg:w-[480px] lg:pr-10 px-3 lg:px-0">
            {/* Categories area Title */}
            <div className="flex items-center gap-2">
                <span className="text-4xl"><IoIosList /></span> <h3 className="font-bold text-2xl text-black-secondary">Select Categories</h3>
            </div>

            {/* Search Input */}
            <SearchInput searchInputText="Search Category" handleSearchCategory={handleSearchCategory} />

            {/* Categories Selection Input Area */}
            <div className="flex flex-wrap gap-x-6 lg:gap-x-0 lg:flex-col gap-y-7 py-5">
                {
                    filteredCategories?.map((category: string, key: number) => (
                        <div key={key} className="flex gap-2 lg:gap-3">
                            <input
                                onChange={(e) => handleCategory(category, e.target.checked)}
                                className="h-7 w-7 cursor-pointer"
                                type="checkbox"
                                name="category"
                                id={category.toLowerCase()}
                                checked={categoryQueries.includes(category)} // Determine if the category is selected
                            />
                            <label
                                className="text-lg lg:text-xl font-bold select-none text-black-secondary cursor-pointer"
                                htmlFor={category.toLowerCase()}
                            >
                                {category}
                            </label>
                        </div>
                    ))
                }
            </div>

        </aside>
    );
}

export default CatergorySideBar;