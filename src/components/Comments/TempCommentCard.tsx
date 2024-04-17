import Link from "next/link";
import UserImage from "../common/UserImage";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";

type TempCommentCardPropsTypes = {
    comment: string,
    isError: boolean,
    isCreateCommentLoading: boolean
}

const TempCommentCard = ({ comment, isCreateCommentLoading, isError }: TempCommentCardPropsTypes) => {
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

                {isCreateCommentLoading && <p className="mt-2">Posting...</p>}
                {isError && <p className="error">Something went wrong!</p>}
            </div>
        </div>
    );
};

export default TempCommentCard;