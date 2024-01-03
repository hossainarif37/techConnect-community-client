import { Link } from "react-router-dom";
import profile_blank_image from "../../assets/icons/profile_blank_image.png";
import { useState } from "react";

const UserImage = ({ modal }) => {
    const [image, setImage] = useState(false);
    return (
        <div className={`${modal ? "w-14" : "w-16"} relative cursor-pointer group`}>
            <Link to="/profile">
                <div className="w-full h-full absolute rounded-full opacity-0 group-hover:opacity-10 bg-black top-0 duration-100"></div>
                <img className="w-full" src={image ? image : profile_blank_image} alt="" />
            </Link>
        </div>
    );
};

export default UserImage;