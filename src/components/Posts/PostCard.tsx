import Link from "next/link";
import UserImage from "../common/UserImage";
import postCardStyles from "./postcard.module.css"
import { Icon } from "@iconify/react"
import React from "react";



const PostCard = ({ post }: any) => {
    const { content, category, author } = post;
    const { name, profilePicture } = author;

    // Split the content by a single newline character
    const contentLines = content.split('\n');

    return (
        <div className="bg-white py-3 px-10 rounded-xl">

            {/* Header Start */}
            <div className="flex justify-between items-center text-black-secondary mb-2">

                {/* Heading Left */}
                <div className='flex gap-x-3 items-center'>

                    {/* User Image */}
                    <UserImage
                        customWidth="w-16"
                        profilePicture={profilePicture}
                    />

                    {/* Title and Category Wrapper */}
                    <div>
                        {/* User Name */}
                        <Link href="#" className='lg:text-base xl:text-lg text-black-secondary hover:underline font-bold'>{name}</Link>

                        {/* Category Selection */}
                        <div className="flex gap-x-1 bg-white-secondary px-1 mt-1 rounded-lg items-center">

                            {/* Category Icon */}
                            <span className="text-3xl"><Icon icon="f7:menu" /></span>

                            {/* Category Text */}
                            <span className="font-bold">{category}</span>

                        </div>
                    </div>

                </div>

                {/* Save Button */}
                <button
                    type="button"
                    className="flex items-center py-1 gap-x-1 px-2 rounded-lg cursor-pointer bg-white-secondary duration-200"
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
            {
                contentLines.map((line, index) => {
                    // Check if the next line is also empty to determine if we need a break
                    const isNextLineEmpty = contentLines[index + 1] === '';

                    return (
                        <React.Fragment key={`fragment-${index}`}>
                            {/* Render the line in a <p> tag */}
                            <p className="pl-2 xl:text-xl lg:text-base">{line}</p>
                            {/* If the next line is empty, render a <br /> tag to preserve the line break */}
                            {isNextLineEmpty && <br key={`break-${index}`} />}
                        </React.Fragment>
                    );
                })}

            {/* horizontal line */}
            <hr className="mt-5 mb-2" />

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

                {/* Share */}
                <button>
                    {/* Share Icon */}
                    <span><Icon icon="uil:share" /></span>
                    {/* Text */}
                    <p>Share</p>
                </button>
            </div>

        </div>
    );
};

export default PostCard;