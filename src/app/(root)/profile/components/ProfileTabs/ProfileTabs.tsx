"use client"

import { IRootState } from "@/types/types";
import profiletabStyles from "./profileTabs.module.css"
import Link from "next/link";
import { useSelector } from "react-redux";
import Loading from "@/components/common/Loading";
import { usePathname } from "next/navigation";

const ProfileTabs = () => {
    const pathname = usePathname();
    const { user } = useSelector((state: IRootState) => state.userSlice);

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
            title: 'Questions',
            path: `/profile/${_id}/questions`,
            // path: "/questions",
        },
        {
            title: 'Saved',
            path: "#",
            // path: "/courses",
        },
        {
            title: 'Books',
            path: "#",
            // path: "/books",
        },
        {
            title: 'Courses',
            path: "#",
            // path: "/meetup",
        }
    ]

    return (
        <div className={`mt-3 lg:my-5 grid md:grid-cols-5  justify-center gap-3 lg:gap-7 ${profiletabStyles.tabLink}`}>
            {
                profileTabLinks.map((link, i) =>
                    <Link className={`${link.path === pathname ? 'bg-secondary text-white' : 'text-black-secondary'}`} key={i} href={link.path}>{link.title}</Link>
                )
            }
        </div>
    );
};

export default ProfileTabs;