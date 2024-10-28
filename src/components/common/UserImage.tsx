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
        <div>
            <Image className={cn('relative cursor-pointer group', className)} src={profilePicture ? profilePicture : profile_blank_image} priority alt="User Image" />
        </div>
    )
};

export default UserImage;
