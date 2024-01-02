import UserImage from "../../common/UserImage";

const PostInputCard = () => {
    return (
        <div className="bg-white rounded-xl flex p-10 gap-5">
            <UserImage />
            <button className="flex-1 rounded-full text-left text-lg font-semibold pl-10 text-black-secondary bg-white-secondary hover:bg-gray-secondary duration-100" type="button">Share Your Experience</button>
        </div>
    );
};

export default PostInputCard;