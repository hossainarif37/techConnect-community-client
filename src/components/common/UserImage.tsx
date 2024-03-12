import Image from "next/image";
import Link from "next/link";
import profile_blank_image from "../../../public/icons/profile_blank_image.png";

type UserImageProps = {
    isModal?: boolean;
    profilePicture?: string;
    customWidth?: string;
}

const UserImage = ({ isModal, profilePicture, customWidth }: UserImageProps) => {
    return (
        <div className={`${isModal ? "w-14" : (customWidth ? customWidth : "xl:w-16 lg:w-14")} relative cursor-pointer group`}>
            <Link href="/profile">
                <div className="w-full h-full absolute rounded-full opacity-0 group-hover:opacity-10 bg-black top-0 duration-100"></div>
                <Image className="w-full" src={profilePicture ? profilePicture : profile_blank_image} alt="" />
            </Link>
        </div>
    );
};

export default UserImage;
