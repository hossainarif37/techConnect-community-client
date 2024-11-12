"use client"

import Image from "next/image";
import profile_blank_image from "../../../../../public/icons/profile_blank_image.png";
import { useGetUserProfileByIdQuery, useUpdateUserMutation } from "@/redux/api/endpoints/users/users";
import { useParams } from "next/navigation";
import LoadingRound from "@/components/common/LoadingRound";
import { useState } from "react";
import { TbPhotoPlus, TbUserPlus } from "react-icons/tb";
import PrimaryButton from "@/components/common/Button/PrimaryButton";
import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { setUser } from "@/redux/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import { checkOwner } from "@/utils/checkOwner";


const ProfileHeader = () => {
    const params = useParams();
    const { isError, error, isLoading, data, refetch } = useGetUserProfileByIdQuery(params?.id);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [updateUser] = useUpdateUserMutation();
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const dispatch = useDispatch();
    if (isLoading) {
        return <LoadingRound className="text-2xl text-blue-primary py-20" />
    }
    const { name, profilePicture, followers, following, _id: userId } = data?.user;
    const isOwner = checkOwner(params?.id as string, user?._id as string);

    const generateUniqueIdentifier = (file: File): string => {
        return `${file.name}_${file.size}_${file.lastModified}`;
    };


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

    console.log('User Id: ', data);


    const handleUploadPhoto = async () => {
        try {
            const uniqueIdentifier = generateUniqueIdentifier(selectedFile!);
            setIsUploading(true);
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
            if (!cloudName || !uploadPreset) {
                throw new Error('Cloudinary credentials are missing.');
            }
            // Create a FormData object
            const formData = new FormData();
            formData.append('file', selectedFile!);
            formData.append('upload_preset', uploadPreset);
            formData.append('cloud_name', cloudName);
            formData.append('public_id', uniqueIdentifier);

            // Make a POST request to Cloudinary's upload API
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Image uploaded successfully:', data);

            updateUser({ userId, body: { profilePicture: data.secure_url } }).unwrap()
                .then(({ user }) => {
                    toast.success('Image uploaded successfully!');
                    dispatch(setUser({ user, isAuthenticated: true }));
                    console.log('User: ', user);
                    refetch();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setIsUploading(false);
                    setSelectedFile(null);
                });



        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
        }
        finally {
            setIsUploading(false);
        }
    }

    return (
        <section>
            {/*-------- Profile Header Start ---------*/}
            <div className="md:w-[600px] xl:w-[750px] text-white mx-auto flex flex-col lg:flex-row justify-center items-center">

                {/* Profile Photo */}
                <div className="w-28 h-28 overflow-hidden mb-3 rounded-full lg:mb-0 lg:w-32 lg:h-32 xl:w-48 xl:h-48 md:mr-5">
                    <Image
                        className={`rounded-full object-cover ${(selectedFile || profilePicture) && 'scale-125'}`}
                        src={selectedFile ? URL.createObjectURL(selectedFile) : profilePicture || profile_blank_image}
                        width={300}
                        height={300}
                        alt={name || "Profile Picture"}
                    />
                </div>

                {/* Profile Title Area */}
                <div className={"flex  justify-between gap-y-2 gap-x-12  lg:gap-y-0 items-center"}>
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
                        isOwner ?
                        <>
                            {
                                selectedFile ? (
                                    <div className="flex items-center flex-col gap-2 lg:gap-3">
                                        <PrimaryButton
                                            disabled={isUploading}
                                            onClick={handleUploadPhoto}
                                            className="flex w-full py-2 lg:py-2.5 lg:w-56 justify-center items-center gap-x-1 border text-white bg-blue-primary border-blue-primary font-semibold">
                                            <span className="text-xl lg:text-2xl"><FiUpload /></span>
                                            <span className="text-sm lg:text-base">{isUploading ? 'Uploading...' : 'Upload Photo'}</span>
                                        </PrimaryButton>
                                        <PrimaryButton
                                            onClick={() => setSelectedFile(null)}
                                            className="flex w-full py-2 lg:py-2.5 lg:w-56 justify-center items-center gap-x-1 border border-highlight font-semibold">
                                            <span className="text-xl lg:text-2xl"><IoClose /></span>
                                            <span className="text-sm lg:text-base">Cancel</span>
                                        </PrimaryButton>
                                    </div>
                                ) :
                                    <label htmlFor="upload-photo" className="w-full lg:px-10 px-5 lg:w-56 py-2 lg:py-3 rounded-lg gap-x-1 bg-text-white border  border-highlight cursor-pointer font-semibold">
                                        <input onChange={handleFileChange} type="file" className="hidden" id="upload-photo" accept="image/*" />
                                        <div className="flex justify-center items-center gap-x-2">
                                            <span className="text-xl lg:text-2xl"><TbPhotoPlus /></span>
                                            <span className="text-sm lg:text-base">Choose Photo</span>
                                        </div>
                                    </label>
                            }
                        </>
                        :
                        <PrimaryButton className="border lg:px-5 lg:py-2 border-highlight flex items-center justify-center gap-x-2 font-semibold">
                            <span className="text-xl lg:text-2xl"><TbUserPlus /></span>
                            <span className="text-sm lg:text-base">Follow</span>
                        </PrimaryButton>
                    }
                </div>
            </div>
        </section>
    );
};

export default ProfileHeader;

