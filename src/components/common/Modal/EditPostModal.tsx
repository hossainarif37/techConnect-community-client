import { Controller, useForm } from "react-hook-form";
import UserImage from "../UserImage";
import { categories } from "@/constants/categories";
import { IRootState } from "@/types/types";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import PrimaryButton from "../Button/PrimaryButton";

type PostModalTypes = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleEditPost: (data: any) => void;
    post: any;
}

const EditPostModal = ({ isModalOpen, setIsModalOpen, post, handleEditPost }: PostModalTypes) => {
    const [textareaRows, setTextareaRows] = useState(5);
    const [hasText, setHasText] = useState(!!post.content);

    // Initialize form with useForm and add setValue for manual control
    const { handleSubmit, formState: { errors }, setValue, control , reset} = useForm();

    // Set form values explicitly whenever `post` changes
    useEffect(() => {
        if (post) {
            setValue("content", post.content || '', { shouldDirty: true });
            setValue("category", post.category || '', { shouldDirty: true });
            setHasText(!!post.content); 
        }
    }, [post, setValue]);

    const localRef = useRef<HTMLTextAreaElement | null>(null);
    
    useEffect(() => {
        if (isModalOpen && localRef.current) {
            const textarea = localRef.current;
            textarea.focus();
            const textLength = textarea.value.length;
            textarea.setSelectionRange(textLength, textLength);
        }
    }, [isModalOpen]);
    
    const user = useSelector((state: IRootState) => state.userSlice.user);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        const trimmedText = text.trim();
        setHasText(trimmedText.length > 0);

        const numberOfLineBreaks = (e.target.value.match(/\n/g) || []).length;
        setTextareaRows(trimmedText.length === 0 ? 5 : Math.min(Math.max(numberOfLineBreaks + 1, 5), 8));
    };

    const handleCloseModal = () => {
        reset({ content: post.content, category: post.category });
        setIsModalOpen(false);
    };

    return (
        <form onSubmit={handleSubmit(handleEditPost)} className="w-full">
            <h1 className="text-2xl text-white font-semibold text-center">Edit Post</h1>
            <button type="button" onClick={handleCloseModal} className="cursor-pointer text-3xl text-white duration-200 absolute top-5 right-7">
                <IoMdClose />
            </button>
            <hr className="my-5 border-none h-0.5 bg-white/10" />

            <div className="flex gap-x-5 items-center">
                <UserImage className="w-14 xl:w-16" />
                <div>
                    <h2 className='text-lg xl:text-xl text-white font-bold'>{user?.name}</h2>
                    <div className="flex gap-x-2">
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: "Category is required!" }}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className='bg-secondary text-white p-1 mt-0 xl:mt-1 text-sm xl:text-base outline-none border border-secondary rounded-lg cursor-pointer duration-100'
                                >
                                    <option value="">Select Category</option>
                                    {categories?.map((category, i) => (
                                        <option key={i} value={category}>{category}</option>
                                    ))}
                                </select>
                            )}
                        />
                        {typeof errors?.category?.message === 'string' && <p className="error">{errors.category.message}</p>}
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <Controller
                    name="content"
                    control={control}
                    rules={{ required: 'Content is required! Share your thoughts' }}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            className='w-full bg-accent outline-none text-xl font-sans placeholder:font-normal text-white'
                            placeholder='Write here...'
                            rows={textareaRows}
                            onChange={(e) => {
                                field.onChange(e);
                                handleTextareaChange(e);
                            }}
                            ref={(e) => {
                                field.ref(e);
                                localRef.current = e;
                            }}
                        />
                    )}
                />
                {typeof errors?.content?.message === 'string' && <p className="error">{errors.content.message}</p>}
            </div>

            <div className="mt-4 flex justify-end">
                <PrimaryButton
                    disabled={!hasText}
                    type="submit"
                    className={`${!hasText ? "btn-disabled" : "bg-gradient-to-r from-[#079EF2] to-blue-primary text-white"} select-none py-3 rounded-lg xl:py-4 lg:py-3 w-full font-bold`}
                >
                    {false ? 'Updating...' : 'Update'}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default EditPostModal;
