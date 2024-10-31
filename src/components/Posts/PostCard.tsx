import Link from "next/link";
import UserImage from "../common/UserImage";
import postCardStyles from "./postcard.module.css"
import { Icon } from "@iconify/react"
import React, { useEffect, useRef, useState } from "react";
import Comments from "../Comments/Comments";
import { renderContentWithBr } from "@/utils/renderContentWithBr";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PostActionsMenu from "./PostActionsDropdown";
import PostActionButton from "./PostActionButton";
import LikeButton from "./LikeButton";

const PostCard = ({ post }: any) => {
    const { content, category, author, _id: postId, likes } = post;
    const { name, profilePicture, _id: authorId } = author;
    const isLiked = likes?.includes(authorId);
    const commentInputRef = useRef<HTMLTextAreaElement>(null);

    return (
        <div className="bg-[#122033] py-3 px-3 md:px-10 rounded-xl max-h-full w-full mx-auto md:w-[500px] xl:w-[650px]">
            <div>
                {/* Header Start */}
                <div className="flex justify-between items-start text-black-secondary mb-2">
                    {/* Heading Left */}
                    <div className='flex gap-x-3 items-center'>
                        {/* User Image */}
                        <Link href={`/profile/${authorId}/posts`}>
                            <UserImage
                                className="w-12 lg:w-14 xl:w-16"
                                profilePicture={profilePicture}
                            />
                        </Link>

                        {/* Title and Category Wrapper */}
                        <div>
                            {/* User Name */}
                            <Link href={`/profile/${authorId}/posts`} className='text-base xl:text-lg text-white hover:underline font-bold'>{name}</Link>

                            {/* Selected Category */}
                            <div className="flex gap-x-1 bg-accent text-white px-1 mt-1 rounded-lg items-center">
                                <span className="text-xl lg:text-2xl xl:text-3xl">
                                    <Icon icon="f7:menu" />
                                </span>
                                <span className="text-nowrap text-sm lg:text-base">{category}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <PostActionButton authorId={authorId} />
                </div>
                {/* Header End */}

                {/* Content */}
                {/* Render the modified content */}
                {renderContentWithBr(content, "pl-2 xl:text-xl text-[#f3f3f3] text-base")}

                {/* horizontal line */}
                {/* horizontal line */}
                <hr className="mt-5 border-none h-0.5 bg-white/10" />

                {/* Reaction Icons */}
                <div className={postCardStyles.reactionIcons}>

                    {/* Like */}
                    <LikeButton postId={postId} initialLikesCount={likes?.length} initialIsLiked={isLiked} />

                    {/* Comment */}
                    <button type="button" onClick={() => commentInputRef.current?.focus()}>
                        {/* Comment Icon */}
                        <span className="text-2xl xl:text-3xl"><Icon icon="octicon:comment-24" /></span>
                        {/* Text */}
                        <p>Comment</p>
                    </button>
                </div>

                {/* horizontal line */}
                <hr className="border-none h-0.5 bg-white/10" />
            </div>

            {/* Comments */}
            <Comments postId={postId} commentInputRef={commentInputRef} />
        </div>
    );
};

export default PostCard;