"use client"

import { CgProfile } from "react-icons/cg";
import postCardStyles from './postcard.module.css'
import { BsBookmarkPlusFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegSquarePlus } from "react-icons/fa6";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import { FaWindowClose } from "react-icons/fa";
import { IconType } from "react-icons";

// Define reusable type for the onClick handler
type TOnClickHandler = (
    setActionsDropdown: React.Dispatch<React.SetStateAction<boolean>>, 
    postId?: string
) => void;

// Define the ActionItem interface using OnClickHandler
interface IActionItem {
    icon: JSX.Element;
    title: string;
    onClick: TOnClickHandler;
}

interface PostActionsMenuProps {
    authorId: string;
    setActionsDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const loggedInUserPostActions: IActionItem[]  = [
    {
        icon: <BsBookmarkPlusFill />,
        title: "Save Post",
        onClick: (setActionsDropdown) => {
            setActionsDropdown(false);
        }
    },
    {
        icon: <MdModeEdit />,
        title: "Edit Post",
        onClick: (setActionsDropdown) => {
            setActionsDropdown(false);
        }
    },
    {
        icon: <RiDeleteBin6Line  />,
        title: "Delete Post",
        onClick: (setActionsDropdown) => {
            setActionsDropdown(false);
        }
    }
]

const nonLoggedInUserPostActions: IActionItem[] = [
    {
        icon: <BsBookmarkPlusFill />,
        title: "Save Post",
        onClick: (setActionsDropdown) => {
            setActionsDropdown(false);
        }
    },
    {
        icon: <FaRegSquarePlus  />,
        title: "Follow",
        onClick: (setActionsDropdown) => {
            setActionsDropdown(false);
        }
    },
    {
        icon: <FaWindowClose   />,
        title: "Unfollow",
        onClick: (setActionsDropdown) => {
            setActionsDropdown(false);
        }
    },
]

const PostActionsMenu = ({setActionsDropdown, authorId}: PostActionsMenuProps) => {
    const {user} = useSelector((state: IRootState) => state.userSlice);
    const isFollow = true;

    const actionButtons = user?._id === authorId ? loggedInUserPostActions : nonLoggedInUserPostActions;

    return (
        <ul className={`${postCardStyles.postActionsMenu}`}>
                {
                    actionButtons.map((action, index) => (
                        <li key={index} className={`${action.title === "Follow" && isFollow && "hidden" || action.title === "Unfollow" && !isFollow && "hidden"}`}>
                            <button onClick={() => action.onClick(setActionsDropdown)}>
                                <span className="text-2xl">{action.icon}</span>
                                <span className="text-lg font-semibold">{action.title}</span>
                            </button>
                        </li>
                    ))
                }
            </ul>
    );
};

export default PostActionsMenu;