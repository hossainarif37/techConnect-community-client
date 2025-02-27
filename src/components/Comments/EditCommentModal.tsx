"use client"

import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";
import PrimaryButton from "../common/Button/PrimaryButton";
import { useEditCommentMutation } from "@/redux/api/endpoints/comments/comments";
import toast from "react-hot-toast";

type EditCommentModalTypes = {
    comment: any;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditCommentModal = ({ comment, isModalOpen, setIsModalOpen }: EditCommentModalTypes) => {
    const [textareaRows, setTextareaRows] = useState(5);
    const localRef = useRef<HTMLTextAreaElement | null>(null);
    const modalRef = useRef<HTMLFormElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [editComment, { isError, error, data }] = useEditCommentMutation();

    const { control, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
        defaultValues: { content: comment.content || '' }
    });

    const contentValue = watch("content", comment.content || '');

    useEffect(() => {
        if (comment) {
            setValue("content", comment.content || '', { shouldDirty: true });
        }
    }, [comment, setValue]);

    // Function to focus the textarea
    const focusTextarea = () => {
        if (localRef.current) {
            localRef.current.focus();
            const textLength = localRef.current.value.length;
            localRef.current.setSelectionRange(textLength, textLength); // Place cursor at the end
        }
    };

    // Focus the textarea when the modal opens using requestAnimationFrame
    useEffect(() => {
        if (isModalOpen) {
            requestAnimationFrame(() => {
                focusTextarea();
            });
        }
    }, [isModalOpen]);

    // Focus restoration on focusout event specifically for dropdown interference
    useEffect(() => {
        const handleFocusOut = (event: FocusEvent) => {
            // If focus leaves the modal (e.g., due to dropdown), refocus the textarea
            if (isModalOpen && modalRef.current && !modalRef.current.contains(event.relatedTarget as Node)) {
                focusTextarea();
            }
        };

        addEventListener("focusout", handleFocusOut);

        return () => {
            removeEventListener("focusout", handleFocusOut);
        };
    }, [isModalOpen]);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        const trimmedText = text.trim();

        const numberOfLineBreaks = (text.match(/\n/g) || []).length;
        setTextareaRows(trimmedText.length === 0 ? 5 : Math.min(Math.max(numberOfLineBreaks + 1, 5), 8));
    };

    const handleCloseModal = () => {
        reset({ content: comment.content || '' });
        setIsModalOpen(false);
    };

    const handleUpdateComment = (data: any) => {
        setIsLoading(true);

        // Add your update logic here
        editComment({ ...data, commentId: comment._id }).unwrap().then(() => {
            handleCloseModal();
            toast.success("Comment updated successfully!");
        })
            .catch((err) => console.log("Edit Comment Error:", err))
            .finally(() => setIsLoading(false));
    };

    const isSubmitDisabled = contentValue.trim().length === 0;

    return (
        <form onSubmit={handleSubmit(handleUpdateComment)} className="w-full" ref={modalRef}>
            <h1 className="text-2xl text-white font-semibold text-center">Edit Comment</h1>

            <button
                type="button"
                onClick={handleCloseModal}
                className="cursor-pointer text-3xl text-white duration-200 absolute top-5 right-7"
            >
                <IoMdClose />
            </button>
            <hr className="my-5 border-none h-0.5 bg-white/10" />

            <div className="mt-4">
                <Controller
                    name="content"
                    control={control}
                    rules={{ required: 'Content is required! Share your thoughts' }}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            className="w-full bg-accent outline-none text-xl font-sans placeholder:font-normal text-white"
                            placeholder="Write here..."
                            rows={textareaRows}
                            onChange={(e) => {
                                field.onChange(e);
                                handleTextareaChange(e);
                            }}
                            ref={(el) => {
                                field.ref(el);
                                localRef.current = el;
                            }}
                        />
                    )}
                />
                {typeof errors?.content?.message === 'string' && <p className="error">{errors.content.message}</p>}
            </div>

            <div className="mt-4 flex justify-end">
                <PrimaryButton
                    disabled={isSubmitDisabled}
                    type="submit"
                    className={`${isSubmitDisabled ? "btn-disabled" : "bg-gradient-to-r from-[#079EF2] to-blue-primary text-white"} select-none py-3 rounded-lg xl:py-4 lg:py-3 w-full font-bold`}
                >
                    {isLoading ? 'Updating...' : 'Update'}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default EditCommentModal;
