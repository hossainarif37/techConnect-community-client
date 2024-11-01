"use client"

import { IRootState } from "@/types/types";
import Image from "next/image";
import { useSelector } from "react-redux";
import profile_blank_image from "../../../../../public/icons/profile_blank_image.png";
import Loading from "@/components/common/Loading";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useGetUserProfileByIdQuery } from "@/redux/api/endpoints/users/users";
import { useParams } from "next/navigation";
import LoadingRound from "@/components/common/LoadingRound";


const ProfileHeader = () => {
    const params = useParams();
    const { isError, error, isLoading, data } = useGetUserProfileByIdQuery(params?.id);

    if (isLoading) {
        return <LoadingRound className="text-2xl text-blue-primary py-20"/>
    }


    const { name, profilePicture, followers, following } = data?.user;

    const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    }

    return (
        <section>
            {/*-------- Profile Header Start ---------*/}
            <div className="md:w-[600px] xl:w-[750px] text-white mx-auto flex flex-col lg:flex-row items-center">

                {/* Profile Photo */}
                <div className="w-28 mb-3 lg:mb-0 lg:w-32 xl:w-48 md:mr-5">
                    <Image
                        className="w-full"
                        src={profile_blank_image} alt=""
                    />
                </div>

                {/* Profile Title Area */}
                <div className="flex flex-1 justify-between gap-y-2 gap-x-7  lg:gap-y-0 items-center">
                    <div>
                        {/* Name */}
                        <h4 className="font-bold text-nowrap">{name}</h4>

                        {/* Followers */}
                        <h4 className="text-nowrap"><span>{followers?.length}</span> Followers</h4>

                        {/* Following */}
                        <h4 className="text-nowrap"><span>{following?.length}</span> Following</h4>
                    </div>

                    {/* Change Photo Button */}
                    <label htmlFor="upload-photo" className="btn bg-blue-primary cursor-pointer font-semibold border flex items-center border-accent gap-3">
                        <input onChange={handleUploadPhoto} type="file" className="hidden" id="upload-photo" />
                        <span className="text-2xl"><FaCloudUploadAlt /></span>
                        <span>Upload Photo</span>
                    </label>
                </div>

            </div>
        </section>
    );
};

export default ProfileHeader;

