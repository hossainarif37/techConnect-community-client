import Image from "next/image";
import Link from "next/link";
import profile_blank_image from "../../../public/icons/profile_blank_image.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileDropdown } from "@/redux/slices/navbar/navbarSlice";
import { IRootState } from "@/types/types";
import UserMenuDropdown from "../shared/Navbar/UserMenuDropDown/UserMenuDropdown";
import { cn } from "@/lib/utils";

type UserImagePropsTypes = {
    profilePicture?: string;
    className?: string;
}

const UserImage = ({ profilePicture, className }: UserImagePropsTypes) => {
    return (
        <div className={cn("overflow-hidden rounded-full", className)}>
            <Image className={`relative w-full object-contain ${profilePicture && 'scale-125'} cursor-pointer group rounded-full`} src={profilePicture ? profilePicture : profile_blank_image} width={500} height={500} priority alt="User Image" />
        </div>
    )
};

export default UserImage;
