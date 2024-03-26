import Image from "next/image";
import Link from "next/link";
import profile_blank_image from "../../../public/icons/profile_blank_image.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileDropdown } from "@/redux/slices/navbar/navbarSlice";
import { IRootState } from "@/types/types";
import UserMenuDropdown from "../shared/Navbar/UserMenuDropDown/UserMenuDropdown";

type UserImagePropsTypes = {
    profilePicture?: string;
    customWidth: string;
}

const UserImage = ({ profilePicture, customWidth }: UserImagePropsTypes) => {

    const dispatch = useDispatch();

    const { isProfileDropdown } = useSelector((state: IRootState) => state.navbarSlice);

    const handleProfileDropdown = () => {
        dispatch(toggleProfileDropdown());
    }


    return (
        <>
            <div
                onClick={handleProfileDropdown}
                className="relative cursor-pointer group" title="Account"
            >

                <div className="w-full h-full absolute rounded-full opacity-0 group-hover:opacity-40 bg-black top-0 duration-100"></div>

                <Image className={`${customWidth} relative cursor-pointer group`} src={profilePicture ? profilePicture : profile_blank_image} priority alt="" />

                {isProfileDropdown && <UserMenuDropdown />}
            </div>


        </>
    );
};

export default UserImage;
