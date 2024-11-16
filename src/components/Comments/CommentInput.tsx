"use client"
import { Dispatch, SetStateAction, useState, forwardRef, useImperativeHandle, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type CommentInputPropsTypes = {
    commentInputText: string,
    register: UseFormRegisterReturn,
    isCreateCommentLoading: boolean,
    isError: boolean,
    hasText: boolean,
    setHasText: Dispatch<SetStateAction<boolean>>
}

const CommentInput = forwardRef<{ focus: () => void } | null, CommentInputPropsTypes>(({
    commentInputText, 
    register, 
    isCreateCommentLoading, 
    isError, 
    hasText, 
    setHasText 
}, ref) => {
    const [textareaRows, setTextareaRows] = useState(1);

    // Create a local ref to store the textarea DOM element
    const localRef = useRef<HTMLTextAreaElement | null>(null);

    // Allow parent component to focus on the textarea
    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        const trimmedText = text.trim();
        setHasText(trimmedText.length > 0);

        const numberOfLineBreaks = (e.target.value.match(/\n/g) || []).length;
        setTextareaRows(trimmedText.length === 0 ? 1 : Math.min(Math.max(numberOfLineBreaks + 1, 1), 8));
    };

    return (
        <div className={`flex-1 flex items-${textareaRows > 1 ? 'end' : 'center'} relative`}>
            <textarea
                {...register}
                ref={(element) => {
                    localRef.current = element; // Set the element to localRef
                    register.ref(element); // Pass the element to register.ref for form handling
                }}
                onChange={handleTextareaChange}
                className={`w-full pr-12 ${textareaRows > 1 ? 'rounded-xl pb-6' : 'rounded-full'} border border-accent bg-transparent text-white outline-none p-2 xl:p-4 px-4 text-lg placeholder:xl:font-semibold placeholder:text-nowrap`}
                cols={30}
                rows={textareaRows}
                id="comment-input"
                placeholder={commentInputText}
            ></textarea>
            <div className={`absolute right-3 ${textareaRows > 1 && 'bottom-1'}`}>
                <button
                    title="Comment"
                    disabled={isCreateCommentLoading}
                    className="text-white hover:bg-accent text-2xl w-10 h-10 flex justify-center items-center rounded-full"
                    type="submit"
                >
                    {isCreateCommentLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : <IoMdSend />}
                </button>
            </div>
        </div>
    );
});

CommentInput.displayName = 'CommentInput';

export default CommentInput;
