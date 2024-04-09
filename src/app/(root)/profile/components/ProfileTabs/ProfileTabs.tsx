"use client"

import { IRootState } from "@/types/types";
import profiletabStyles from "./profileTabs.module.css"
import Link from "next/link";
import { useSelector } from "react-redux";
import Loading from "@/components/common/Loading";
import { useParams, usePathname } from "next/navigation";

const ProfileTabs = () => {
    const pathname = usePathname();
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const { id: paramsId } = useParams();

    if (!user) {
        return <Loading />
    }

    const { _id, name, profilePicture, followers, following } = user;

    const profileTabLinks = [
        {
            title: "Posts",
            path: `/profile/${_id}/posts`,
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
        <div className={`mt-3 lg:my-5 grid ${paramsId !== _id ? 'md:grid-cols-4' : 'md:grid-cols-5'}  justify-center gap-3 lg:gap-7 ${profiletabStyles.tabLink}`}>
            {
                profileTabLinks.map((link, i) =>
                    <Link className={`${(paramsId !== _id && link.title === 'Saved') ? 'hidden' : 'block'} ${link.path === pathname ? 'bg-secondary text-white' : 'text-black-secondary'}`} key={i} href={link.path}>{link.title}</Link>
                )
            }
        </div>
    );
};

export default ProfileTabs;