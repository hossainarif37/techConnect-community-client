"use client"

import { IRootState } from "@/types/types";
import Image from "next/image";
import { useSelector } from "react-redux";
import profile_blank_image from "../../../../../public/icons/profile_blank_image.png";
import Loading from "@/components/common/Loading";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useGetUserProfileByIdQuery } from "@/redux/api/endpoints/users/users";
import { useParams } from "next/navigation";


const ProfileHeader = () => {
    const params = useParams();
    console.log(params);
    const { isError, error, isLoading, data } = useGetUserProfileByIdQuery(params.id);



    if (isLoading) {
        return <Loading />
    }

    const { name, profilePicture, followers, following } = data?.user;

    const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    }

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
                    <label htmlFor="upload-photo" className="btn cursor-pointer font-semibold border flex items-center border-accent gap-3">
                        <input onChange={handleUploadPhoto} type="file" className="hidden" id="upload-photo" />
                        <span className="text-2xl text-gray-800"><FaCloudUploadAlt /></span>
                        <span>Upload Photo</span>
                    </label>
                </div>

            </div>
        </section>
    );
};

export default ProfileHeader;

