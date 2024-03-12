import Image from "next/image";
import Link from "next/link";
import profile_blank_image from "../../../public/icons/profile_blank_image.png";

type UserImageProps = {
    profilePicture?: string;
    customWidth: string;
}

const UserImage = ({ profilePicture, customWidth }: UserImageProps) => {
    return (
        <Link className="relative cursor-pointer group" href="/profile">
            <div className="w-full h-full absolute rounded-full opacity-0 group-hover:opacity-10 bg-black top-0 duration-100"></div>
            <Image className={`${customWidth} relative cursor-pointer group`} src={profilePicture ? profilePicture : profile_blank_image} priority alt="" />
        </Link>
    );
};

export default UserImage;
