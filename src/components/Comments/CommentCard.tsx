import { IComment } from "@/types/types";
import Link from "next/link";
import UserImage from "../common/UserImage";

// Adjust the CommentCard component to accept a single `comment` prop
interface CommentCardProps {
    comment: IComment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    return (
        <div className="flex gap-x-2 mt-3">
            <Link href={`/profile/${comment?.author?._id}/posts`}>
                <UserImage className="w-14" profilePicture={comment?.author?.profilePicture} />
            </Link>
            <div className="bg-accent p-3 rounded-xl">
                <Link
                    href={`/profile/${comment?.author?._id}/posts`} className="font-bold text-white text-lg"
                >
                    {comment?.author?.name}
                </Link>
                <p className="text-[#f3f3f3]">
                    {comment?.content}
                </p>
            </div>
        </div>
    );
};

export default CommentCard;