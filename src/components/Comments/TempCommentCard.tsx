import Link from "next/link";
import UserImage from "../common/UserImage";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";

type TempCommentCardPropsTypes = { comment: string }

const TempCommentCard = ({ comment }: TempCommentCardPropsTypes) => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    return (
        <div className="flex gap-x-2 mt-3">
            <Link href={`/profile/${user?._id}/posts`}>
                <UserImage customWidth="w-14" profilePicture={user?.profilePicture} />
            </Link>
            <div className="">
                <div className="bg-white-secondary p-3 rounded-xl">
                    <Link
                        href={`/profile/${user?._id}/posts`} className="font-bold text-lg"
                    >
                        {user?.name}
                    </Link>
                    <p className="font-semibold text-black-secondary">
                        {comment}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TempCommentCard;