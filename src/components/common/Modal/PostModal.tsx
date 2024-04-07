"use client"


import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import toast from "react-hot-toast";
import UserImage from "../UserImage";
import { categories } from "@/constants/categories";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import { useCreatePostMutation } from "@/redux/api/endpoints/posts/posts";

type PostModalTypes = {
    isModalOpen: boolean;
    closeModal: () => void;
}

type PostDataTypes = (data: FieldValues, event: BaseSyntheticEvent<object, any, any> | undefined) => void;


const PostModal = ({ isModalOpen, closeModal }: PostModalTypes) => {
    const [textareaRows, setTextareaRows] = useState(5);
    const [isExistText, setIsExistText] = useState(false);
    const { user } = useSelector((state: IRootState) => state.userSlice);

    const [createPost, { isLoading, isError, error, data }] = useCreatePostMutation();

    const { register, handleSubmit, watch, formState: { errors }, reset, } = useForm();

    const contentInput = document.getElementById('content-input');

    const handleModalClose = () => {
        closeModal();
        setIsExistText(false);
        if (contentInput) {
            (contentInput as HTMLTextAreaElement).value = '';
        }

    }



    useEffect(() => {
        if (contentInput) {
            contentInput.focus();
        }
    }, [isModalOpen]);

    // Handle Text Area Change
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value) {
            setIsExistText(true)
        } else {
            setIsExistText(false)
        }
        if (textareaRows !== 8) {
            // Calculate the number of rows dynamically based on the textarea content
            const numberOfLineBreaks = (e.target.value.match(/\n/g) || []).length;
            setTextareaRows(Math.max(numberOfLineBreaks + 1, 5)); // Set a minimum of 4 rows
        }
    };




    // Handle Create Post
    const handleCreatePost: PostDataTypes = (data, event) => {
        const postResponse = createPost({ ...data, author: user?._id }).unwrap();

        closeModal();
        console.log(data);
        reset();

        setIsExistText(false);

        toast.promise(postResponse, {
            loading: 'Loading',
            success: ({ message }) => {
                return message;
            },
            error: ({ data }) => {
                return data?.message || 'Post Create failed';
            },
        });
    }



    return (
        <>
            <div className={`${isModalOpen ? "scale-100" : "scale-0"} px-2 bg-black bg-opacity-30 top-0 flex items-center justify-center w-full z-50 h-screen fixed right-0`}>

                {/*//* Modal Body */}
                <form onSubmit={handleSubmit(handleCreatePost)} className={`bg-white lg:w-2/5 lg:mt-20 xl:mt-10 p-5 duration-300 rounded-xl ${isModalOpen ? "scale-100" : "scale-0"}`}>


                    {/* Modal Heading Start */}
                    <div className="flex justify-between items-center">

                        <div className='flex gap-x-5 items-center'>

                            {/* User Image */}
                            <UserImage customWidth="w-24" />

                            <div>
                                {/* User Name */}
                                <h2 className='text-xl text-black-secondary font-bold'>{user?.name}</h2>

                                {/* Topics Category Select */}
                                <select
                                    {...register('category', { required: 'Category is required!' })}
                                    className=' p-1 mt-1 outline-none border border-secondary rounded-lg cursor-pointer duration-100'
                                    name="category"
                                    defaultValue='Select Category'
                                >

                                    <option value='' disabled
                                    >
                                        Select Category
                                    </option>
                                    {
                                        categories?.map((category, i) => <option
                                            key={i}
                                            value={category}
                                            disabled={category === 'Select Category'}
                                        >
                                            {category}
                                        </option>)
                                    }
                                </select>
                                {/* Errors */}
                                {
                                    typeof errors?.category?.message === 'string' && <p className="error">{errors?.category?.message}</p>
                                }
                            </div>

                        </div>

                        {/* Modal Close Button */}
                        <button type="button" onClick={handleModalClose} className="cursor-pointer text-5xl hover:text-black-secondary duration-200">
                            <IoMdClose />
                        </button>

                    </div>
                    {/* Modal Heading End */}

                    {/* Textarea */}
                    <div className="mt-4">
                        <textarea
                            {...register('content')}
                            className='w-full outline-none text-xl font-sans placeholder:font-normal text-black-secondary' placeholder='Write here...'
                            id="content-input"
                            cols={30}
                            rows={textareaRows}
                            onChange={handleTextareaChange}
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4 flex justify-end">
                        <button
                            disabled={!isExistText}
                            type="submit"
                            className={` ${!isExistText ? "btn-disabled" : "btn bg-secondary hover:border-secondary text-white hover:bg-transparent  hover:text-black-secondary"} select-none  py-3 rounded-lg xl:py-4 lg:py-3  w-full  font-bold`}
                        >
                            Post
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
};

export default PostModal;