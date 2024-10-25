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
    isProfileDropdownBtn?: boolean;
}

const UserImage = ({ profilePicture, className, isProfileDropdownBtn }: UserImagePropsTypes) => {

    const dispatch = useDispatch();

    const { isProfileDropdown } = useSelector((state: IRootState) => state.navbarSlice);

    const handleProfileDropdown = () => {
        isProfileDropdownBtn && dispatch(toggleProfileDropdown());
    }


    return (
        <>
            <div
                onClick={handleProfileDropdown}
                className="relative cursor-pointer group" title="Account"
            >

                {/* <div className="w-full h-full absolute rounded-full opacity-0 group-hover:opacity-40 bg-black top-0 duration-100"></div> */}

                <Image className={cn('relative cursor-pointer group', className)} src={profilePicture ? profilePicture : profile_blank_image} priority alt="" />

                {(isProfileDropdown && isProfileDropdownBtn) && <UserMenuDropdown />}
            </div>


        </>
    );
};

export default UserImage;
