"use client"

import Image from "next/image";
import profile_blank_image from "../../../../../public/icons/profile_blank_image.png";
import { useGetUserProfileByIdQuery } from "@/redux/api/endpoints/users/users";
import { useParams } from "next/navigation";
import LoadingRound from "@/components/common/LoadingRound";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import PrimaryButton from "@/components/common/Button/PrimaryButton";
import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";


const ProfileHeader = () => {
    const params = useParams();
    const { isError, error, isLoading, data } = useGetUserProfileByIdQuery(params?.id);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    if (isLoading) {
        return <LoadingRound className="text-2xl text-blue-primary py-20" />
    }
    const { name, profilePicture, followers, following } = data?.user;


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file?.type.includes('image')) {
            alert('Please select an image file!');
            return;
        }
        if (file) {
            setSelectedFile(file);
        }
    };


    const handleUploadPhoto = () => {
        console.log('file', selectedFile);
        setIsUploading(true);
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Success');
                toast.success('Image uploaded successfully.');
                setImageUrl(URL.createObjectURL(selectedFile!));
                setSelectedFile(null);
            }, 2000);
        }).catch((err) => {
            console.log('err', err);
        }).finally(() => {
            setIsUploading(false);
        });
    }

    return (
        <section>
            {/*-------- Profile Header Start ---------*/}
            <div className="md:w-[600px] xl:w-[750px] text-white mx-auto flex flex-col lg:flex-row items-center">

                {/* Profile Photo */}
                <div className="w-28 h-28 overflow-hidden mb-3 rounded-full lg:mb-0 lg:w-32 lg:h-32 xl:w-48 xl:h-48 md:mr-5">
                    <Image
                        className={`w-full rounded-full object-cover scale-100 ${selectedFile || imageUrl && 'scale-125'}`}
                        src={selectedFile ? URL.createObjectURL(selectedFile) : imageUrl || profile_blank_image}
                        width={300}
                        height={300}
                        alt=""
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
                    {
                        selectedFile ? (
                            <div className="flex items-center flex-col gap-3">
                                <PrimaryButton
                                    onClick={handleUploadPhoto}
                                    className="flex w-56 justify-center items-center gap-x-1 border text-white bg-blue-primary border-blue-primary font-semibold">
                                    <span className="text-2xl"><FiUpload /></span>
                                    <span>{isUploading ? 'Uploading...' : 'Upload Photo'}</span>
                                </PrimaryButton>
                                <PrimaryButton
                                    onClick={() => setSelectedFile(null)}
                                    className="flex w-56 justify-center items-center gap-x-1 border border-highlight font-semibold">
                                    <span className="text-2xl"><IoClose /></span>
                                    <span>Cancel</span>
                                </PrimaryButton>
                            </div>
                        ) :
                            <label htmlFor="upload-photo" className="w-56 py-3 rounded-lg gap-x-1 bg-text-white border  border-highlight cursor-pointer font-semibold">
                                <input onChange={handleFileChange} type="file" className="hidden" id="upload-photo" accept="image/*" />
                                <div className="flex justify-center items-center gap-x-2">
                                    <span className="text-2xl"><TbPhotoPlus /></span>
                                    <span>Choose Photo</span>
                                </div>
                            </label>
                    }
                </div>
            </div>
        </section>
    );
};

export default ProfileHeader;

