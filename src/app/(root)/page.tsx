import { Metadata } from "next";
import CatergorySideBar from "./profile/components/CatergorySideBar";
import PostInputCard from "@/components/common/Input/PostInputCard";
import Posts from "@/components/Posts/Posts";
import ActiveUserSideBar from "@/components/ActiveUserSideBar/ActiveUserSideBar";

export const metadata: Metadata = {
  title: "Home",
  description: "Generated by create next app",
};

const Home = () => {

  return (
    <div className="flex">
      <CatergorySideBar />
      <section className="bg-accent flex-1 lg:px-14 px-5 py-5">
        <div className="max-w-2xl mx-auto">
          <PostInputCard />
          <Posts />
        </div>
      </section>
      <ActiveUserSideBar />
    </div>
  );
};

export default Home;