"use client";

import CategorySideBar from "./profile/components/CategorySideBar";
import PostInputCard from "@/components/common/Input/PostInputCard";
import Posts from "@/components/Posts/Posts";
import ActiveUserSideBar from "@/components/ActiveUserSideBar/ActiveUserSideBar";
import useScreenSize from "@/hooks/useScreenSize";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";

const Home = () => {
  const screenSize = useScreenSize();
  const largeScreen = screenSize.width >= 1280;
  const { user } = useSelector((state: IRootState) => state.userSlice);

  return (
    <div className="flex flex-col md:flex-row">
      <CategorySideBar />
      <section className="flex-1 lg:px-14 px-0">
        <div className="max-w-2xl mx-auto">
          <PostInputCard />
          <Posts />
        </div>
      </section>
      {largeScreen && <ActiveUserSideBar />}
    </div>
  );
};

export default Home;