"use client"

import { IRootState } from "@/types/types";
import Image from "next/image";
import { useSelector } from "react-redux";
import profile_blank_image from "../../../../../public/icons/profile_blank_image.png";
import Loading from "@/components/common/Loading";


const ProfileHeader = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);

    if (!user) {
        return <Loading />
    }

    const { name, profilePicture, followers, following } = user;

    return (
        <section >
            {/*-------- Profile Header Start ---------*/}
            <div className="lg:w-[750px] mx-auto flex flex-col lg:flex-row items-center">

                {/* Profile Photo */}
                <div className="w-28 mb-3 lg:mb-0 lg:w-36 xl:w-48 mr-5">
                    <Image
                        className="w-full"
                        src={profile_blank_image} alt=""
                    />
                </div>

                {/* Profile Title Area */}
                <div className="flex flex-1 justify-between gap-7 lg:gap-0 items-center">
                    <div>
                        {/* Name */}
                        <h4 className="font-bold text-black-secondary">{name}</h4>

                        {/* Followers */}
                        <h4><span>{followers?.length}</span> Follwers</h4>

                        {/* Following */}
                        <h4><span>{following?.length}</span> Following</h4>
                    </div>

                    {/* Change Photo Button */}
                    <button type="button" className="btn font-semibold border border-accent">Change Photo</button>
                </div>

            </div>
        </section>
    );
};

export default ProfileHeader;

