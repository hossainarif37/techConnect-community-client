import LoadingRound from "@/components/common/LoadingRound";
import CategorySideBar from "./profile/components/CategorySideBar";
import PostInputCard from "@/components/common/Input/PostInputCard";
import ClientWrapper from "@/components/layouts/AuthLayout/components/ClientWrapper";
import Posts from "@/components/Posts/Posts";
import { Suspense } from "react";
import PostCardSkeleton from "@/components/Posts/PostCardSkeleton";

export default function Home() {
  return (
    <ClientWrapper>
      <CategorySideBar />
      <section className="flex-1 lg:px-14 px-0">
        <div className="max-w-2xl mx-auto">
          <PostInputCard />
          <Suspense fallback={<PostCardSkeleton />}>
            <Posts />
          </Suspense>
        </div>
      </section>
    </ClientWrapper>
  );
}