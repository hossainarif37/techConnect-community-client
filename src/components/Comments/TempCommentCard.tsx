import Link from "next/link";
import UserImage from "../common/UserImage";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import { renderContentWithBr } from "@/utils/renderContentWithBr";

type TempCommentCardPropsTypes = { comment: string }

const TempCommentCard = ({ comment }: TempCommentCardPropsTypes) => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    return (
        <div className="flex gap-x-2 mt-3">
            <Link href={`/profile/${user?._id}/posts`}>
                <UserImage className="w-14" profilePicture={user?.profilePicture} />
            </Link>
            <div className="flex-1 bg-accent p-3 rounded-xl">
                <Link
                    href={`/profile/${user?._id}/posts`} className="font-bold text-white text-lg hover:underline"
                >
                    {user?.name}
                </Link>
                
                 {/* Render the modified content */}
                 {renderContentWithBr(comment)}
            </div>
        </div>
    );
};

export default TempCommentCard;