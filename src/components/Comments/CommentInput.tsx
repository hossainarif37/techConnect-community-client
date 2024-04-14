"use client"

import { useSelector } from "react-redux";
import UserImage from "../common/UserImage";
import { IRootState } from "@/types/types";
import { useState } from "react";

type CommentInputPropsTypes = {
    commentInputText: string,
    handleComment?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CommentInput = ({ commentInputText, handleComment }: CommentInputPropsTypes) => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const [hasText, setHasText] = useState(false);
    const [textareaRows, setTextareaRows] = useState(1);

    // Handle Text Area Change
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        const trimmedText = text.trim();
        setHasText(trimmedText.length > 0);

        // Calculate the number of rows dynamically based on the textarea content
        const numberOfLineBreaks = (e.target.value.match(/\n/g) || []).length;
        // If there is no text, set textareaRows to 1, otherwise calculate based on line breaks
        setTextareaRows(trimmedText.length === 0 ? 1 : Math.min(Math.max(numberOfLineBreaks + 1, 1), 8));
    };

    return (
        <div className="mt-3 flex gap-x-3">
            <UserImage customWidth="w-16" profilePicture={user?.profilePicture} />

            <textarea
                onChange={handleTextareaChange}
                className={`w-full ${textareaRows > 1 ? 'rounded-xl' : 'rounded-full'} bg-white-secondary outline-none p-4 placeholder:text-black-secondary text-lg placeholder:font-semibold border-none`} cols={30} name="comment-input" rows={textareaRows} id="comment-input" placeholder={commentInputText}
            ></textarea>
        </div>
    );
};

export default CommentInput;