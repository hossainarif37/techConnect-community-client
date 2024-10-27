import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import useOutsideClick from "@/hooks/useOutsideClick";
import PostActionsDropdown from "./PostActionsDropdown";

const PostActionButton = ({ authorId }: { authorId: string }) => {
    const [actionsDropdown, setActionsDropdown] = useState(false);

    const dropdownRef = useOutsideClick(() => setActionsDropdown(false), actionsDropdown);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Action Button */}
            <button
                onClick={() => setActionsDropdown(!actionsDropdown)}
                type="button"
                className="text-2xl cursor-pointer text-white hover:bg-accent rounded-full p-2 duration-100"
            >
                <HiOutlineDotsHorizontal />
            </button>

            {/* Dropdown */}
            {actionsDropdown && (
                <PostActionsDropdown
                    authorId={authorId}
                    setActionsDropdown={setActionsDropdown}
                />
            )}
        </div>
    );
};

export default PostActionButton;