"use client"

import { useLikePostMutation } from "@/redux/api/endpoints/likes/likes";
import { IRootState } from "@/types/types";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthModal } from "../shared/Modals/AuthModal";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  postId: string;
  initialLikesCount?: number;
  initialIsLiked?: boolean;
}

const LikeButton = ({
  postId,
  initialLikesCount = 0,
  initialIsLiked = false
}: LikeButtonProps) => {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const router = useRouter();

  // Redux
  const [likePost, { isLoading }] = useLikePostMutation();
  const { user } = useSelector((state: IRootState) => state.userSlice);

  // Reset states when props change
  useEffect(() => {
    setLikesCount(initialLikesCount);
    setIsLiked(initialIsLiked);
  }, [initialLikesCount, initialIsLiked]);

  const handleLike = async () => {
    if (isLoading) return;

    if (!user) {
      router.push("/login")
      return;
    }

    try {
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

      // API call
      const response = await likePost({ postId }).unwrap();

      // Update based on server response
      if (response.message === 'Liked' || response.message === 'Removed') {
        setLikesCount(response.likes);
        setIsLiked(response.message === 'Liked');
      }

    } catch (error) {
      console.error('Like operation failed:', error);
      setIsLiked(isLiked);
      setLikesCount(likesCount);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={isLoading}
      className={`
        flex items-center gap-2 
        transition-colors duration-200
        ${isLoading && 'opacity-50'}
        ${isLiked ? 'text-blue-primary' : 'text-white'}
      `}
    >
      {/* Like Icon */}
      <span>
        <Icon
          icon={isLiked ? "ant-design:like-filled" : "ant-design:like-outlined"}
          className="text-2xl xl:text-3xl"
        />
      </span>

      {/* Text and Count */}
      <div className="flex items-center gap-1">
        <p>{isLiked ? 'Liked' : 'Like'}</p>
        {likesCount > 0 && (
          <span className="">
            ({likesCount})
          </span>
        )}
      </div>
    </button>
  );
};

export default LikeButton;