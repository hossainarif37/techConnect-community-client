"use client"


import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";

import toast from "react-hot-toast";
import UserImage from "../UserImage";
import { categories } from "@/constants/categories";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import { useCreatePostMutation } from "@/redux/api/endpoints/posts/posts";
import PrimaryButton from "../Button/PrimaryButton";

type PostModalTypes = {
    isModalOpen: boolean;
    closeModal: () => void;
}

type PostDataTypes = (data: FieldValues, event: BaseSyntheticEvent<object, any, any> | undefined) => void;


const PostModal = ({ isModalOpen, closeModal }: PostModalTypes) => {
    const [textareaRows, setTextareaRows] = useState(5);

    const { user } = useSelector((state: IRootState) => state.userSlice);
    const [hasText, setHasText] = useState(false);

    const [createPost, { isLoading, isError, error, data }] = useCreatePostMutation();

    const { register, handleSubmit, watch, formState: { errors }, reset, control } = useForm();

    const contentInput = document.getElementById('content-input');

    const handleModalClose = () => {
        closeModal();
        setHasText(false);
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
        const text = e.target.value;
        const trimmedText = text.trim();
        setHasText(trimmedText.length > 0);

        // Calculate the number of rows dynamically based on the textarea content
        const numberOfLineBreaks = (e.target.value.match(/\n/g) || []).length;
        // If there is no text, set textareaRows to 1, otherwise calculate based on line breaks
        setTextareaRows(trimmedText.length === 0 ? 5 : Math.min(Math.max(numberOfLineBreaks + 1, 5), 8)); // Set a minimum of 5 rows when text exists
    };




    // Handle Create Post
    const handleCreatePost: PostDataTypes = (data, event) => {
        const postResponse = createPost({ ...data, author: user?._id }).unwrap();


        setHasText(false);

        toast.promise(postResponse, {
            loading: 'Loading',
            success: ({ message }) => {
                reset();
                closeModal();
                return message;
            },
            error: ({ data }) => {
                closeModal();
                return data?.message || 'Post Create failed';
            },
        });
    };

    return (
        <>
            <div className={`${isModalOpen ? "scale-100" : "scale-0"} px-2 bg-primary bg-opacity-70 top-0 flex items-center justify-center w-full z-50 h-screen fixed right-0`}>
                {/*//* Modal Body */}
                <form onSubmit={handleSubmit(handleCreatePost)} className={`bg-accent lg:w-2/5 lg:mt-20 xl:mt-10 p-5 duration-300 rounded-xl ${isModalOpen ? "scale-100" : "scale-0"}`}>
                    {/* Modal Heading Start */}
                    <div className="flex justify-between items-center">
                        <div className='flex gap-x-5 items-center'>
                            {/* User Image */}
                            <UserImage className="w-16" />

                            <div>
                                {/* User Name */}
                                <h2 className='text-xl text-white font-bold'>{user?.name}</h2>

                                <div className="flex gap-x-2">
                                    <Controller
                                        name="category"
                                        control={control}
                                        rules={{ required: "Category is required!" }}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                className='bg-secondary text-white p-1 mt-1 outline-none border border-secondary rounded-lg cursor-pointer duration-100'
                                            >
                                                <option value="">Select Category</option>
                                                {
                                                    categories?.map((category, i) => <option
                                                        key={i}
                                                        value={category}
                                                    >
                                                        {category}
                                                    </option>)
                                                }
                                            </select>
                                        )}
                                    />

                                    {
                                        typeof errors?.category?.message === 'string' && <p className="error">{errors?.category?.message}</p>
                                    }
                                </div>
                            </div>

                        </div>

                        {/* Modal Close Button */}
                        <button type="button" onClick={handleModalClose} className="cursor-pointer text-3xl text-white duration-200">
                            <IoMdClose />
                        </button>

                    </div>
                    {/* Modal Heading End */}

                    {/* Textarea */}
                    <div className="mt-4">
                        <textarea
                            {...register('content', { required: 'Content is required! Share you thoughts' })}
                            className='w-full bg-accent outline-none text-xl font-sans placeholder:font-normal text-white' placeholder='Write here...'
                            id="content-input"
                            cols={30}
                            rows={textareaRows}
                            onChange={handleTextareaChange}
                        ></textarea>
                        {/* Errors */}
                        {
                            typeof errors?.content?.message === 'string' && <p className="error">{errors?.content?.message}</p>
                        }
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4 flex justify-end">
                        <PrimaryButton
                            disabled={!hasText}
                            type="submit"
                            className={`${!hasText ? "btn-disabled" : "bg-gradient-to-r from-[#079EF2] to-blue-primary text-white "} select-none py-3 rounded-lg xl:py-4 lg:py-3 w-full font-bold`}
                        >
                            {isLoading ? 'Posting...' : 'Post'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PostModal;