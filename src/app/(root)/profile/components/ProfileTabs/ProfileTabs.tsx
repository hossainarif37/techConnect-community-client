"use client"

import { IRootState } from "@/types/types";
import profileTabStyles from "./profileTabs.module.css"
import Link from "next/link";
import { useSelector } from "react-redux";
import Loading from "@/components/common/Loading";
import { useParams, usePathname } from "next/navigation";

const ProfileTabs = () => {
    const pathname = usePathname();
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const { id: paramsId } = useParams();

    const _id = user?._id;

    const profileTabLinks = [
        {
            title: "Posts",
            path: `/profile/${paramsId}/posts`,
        },
        {
            title: 'Jobs',
            path: "#",
            // path: "/profile/${_id}/courses",
        },

        {
            title: 'Books',
            path: "#",
            // path: "/profile/${_id}/books",
        },
        {
            title: 'Courses',
            path: "#",
            // path: "/profile/${_id}/courses",
        },
        {
            title: 'Saved',
            path: "#",
            // path: "/profile/${_id}/saved",
        },
    ]

    return (
        <div className={`my-3 pl-10 md:pl-0 sidebar-scrollbar pb-2 md:pb-0 lg:my-5 flex overflow-x-auto md:grid ${paramsId !== _id ? 'md:grid-cols-4' : 'md:grid-cols-5'}  justify-center gap-3 lg:gap-7 ${profileTabStyles.tabLink}`}>
            {
                profileTabLinks.map((link, i) =>
                    <Link className={`${(paramsId !== _id && link.title === 'Saved') ? 'hidden' : 'block'} ${link.path === pathname && 'bg-highlight'} text-white`} key={i} href={link.path}>{link.title}</Link>
                )
            }
        </div>
    );
};

export default ProfileTabs;