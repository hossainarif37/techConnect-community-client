import Posts from "@/components/Posts/Posts";
import PostInputCard from "@/components/common/Input/PostInputCard";

const ProfilePostPage = () => {
    return (
        <section className="bg-accent flex-1 lg:px-14 px-5 py-5">
            <PostInputCard />
            <Posts />
        </section>
    );
};

export default ProfilePostPage;