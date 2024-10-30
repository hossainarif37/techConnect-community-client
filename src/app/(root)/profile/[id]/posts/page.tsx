import Posts from "@/components/Posts/Posts";
import PostInputCard from "@/components/common/Input/PostInputCard";
import ProfilePosts from "../../components/ProfilePosts/ProfilePosts";

const ProfilePostPage = () => {
    return (
        <section className="flex-1 lg:pl-20 px-2 lg:px-0">
            <PostInputCard />
            <ProfilePosts />
        </section>
    );
};

export default ProfilePostPage;