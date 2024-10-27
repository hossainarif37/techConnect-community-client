import Link from "next/link";
import UserImage from "../common/UserImage";
import postCardStyles from "./postcard.module.css"
import { Icon } from "@iconify/react"
import React from "react";
import Comments from "../Comments/Comments";
import { renderContentWithBr } from "@/utils/renderContentWithBr";

const 
PostCard = ({ post }: any) => {
    const { content, category, author, _id: postId, comments } = post;
    console.log(10, author);
    const { name, profilePicture, _id: authorId } = author;

    return (
        <div className="bg-[#122033] py-3 px-10 rounded-xl max-h-full">
            <div>
                {/* Header Start */}
                <div className="flex justify-between items-center text-black-secondary mb-2">

                    {/* Heading Left */}
                    <div className='flex gap-x-3 items-center'>

                        {/* User Image */}
                        <Link href={`/profile/${authorId}/posts`}>
                            <UserImage
                                className="w-16"
                                profilePicture={profilePicture}
                            />
                        </Link>

                        {/* Title and Category Wrapper */}
                        <div>
                            {/* User Name */}
                            <Link href={`/profile/${authorId}/posts`} className='lg:text-base xl:text-lg text-white hover:underline font-bold'>{name}</Link>

                            {/* Category Selection */}
                            <div className="flex gap-x-1 bg-accent text-white px-1 mt-1 rounded-lg items-center">

                                {/* Category Icon */}
                                <span className="text-3xl"><Icon icon="f7:menu" /></span>

                                {/* Category Text */}
                                <span className="">{category}</span>

                            </div>
                        </div>

                    </div>

                    {/* Save Button */}
                    <button
                        type="button"
                        className="flex items-center py-1 gap-x-1 px-2 rounded-lg cursor-pointer bg-accent text-white duration-200"
                    >
                        {/* Save Icon */}
                        <span className="text-3xl">
                            <Icon icon="fluent:save-copy-20-regular" />
                        </span>
                        <span className="font-bold">Save</span>
                    </button>

                </div>
                {/* Header End */}

                {/* Content */}
                {/* Render the modified content */}
                {renderContentWithBr(content, "pl-2 xl:text-xl text-[#f3f3f3] lg:text-base")}

                {/* horizontal line */}
               {/* horizontal line */}
               <hr className="mt-5 border-none h-0.5 bg-white/10"/>

                {/* Reaction Icons */}
                <div className={postCardStyles.reactionIcons}>

                    {/* Like */}
                    <button>
                        {/* Like Icon */}
                        <span><Icon icon="ant-design:like-outlined" /></span>
                        {/* Text */}
                        <p>Like</p>
                    </button>

                    {/* Comment */}
                    <button>
                        {/* Comment Icon */}
                        <span><Icon icon="octicon:comment-24" /></span>
                        {/* Text */}
                        <p>Comment</p>
                    </button>
                </div>

                {/* horizontal line */}
                <hr className="border-none h-0.5 bg-white/10"/>
            </div>

            {/* Comments */}
            <Comments postId={postId} />
        </div>
    );
};

export default PostCard;