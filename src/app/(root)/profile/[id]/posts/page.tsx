import Posts from "@/components/Posts/Posts";
import PostInputCard from "@/components/common/Input/PostInputCard";
import ProfilePosts from "../../components/ProfilePosts/ProfilePosts";

const ProfilePostPage = () => {
    return (
        <section className="bg-accent flex-1 lg:px-14 px-5 py-5">
            <PostInputCard />
            <ProfilePosts />
        </section>
    );
};

export default ProfilePostPage;