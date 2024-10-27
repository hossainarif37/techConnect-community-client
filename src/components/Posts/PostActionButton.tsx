import { useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PostActionsMenu from "./PostActionsMenu";

const PostActionButton = ({ authorId }: { authorId: string }) => {
    const [actionsDropdown, setActionsDropdown] = useState(false);

    const dropdownRef = useRef(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
            setActionsDropdown(false);
        }
    };

    useEffect(() => {
        if (actionsDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [actionsDropdown]);
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
                <PostActionsMenu
                    authorId={authorId}
                    setActionsDropdown={setActionsDropdown}
                />
            )}
        </div>
    );
};

export default PostActionButton;