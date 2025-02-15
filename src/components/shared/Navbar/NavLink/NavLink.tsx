"use client"
import { toggleNav } from "@/redux/slices/navbar/navbarSlice";
import { Icon, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

type NavLinkProps = {
    title: string;
    path: string;
    Icon: React.ElementType;
}

const NavLink = ({ title, path, Icon }: NavLinkProps) => {
    const pathName = usePathname();
    const dispatch = useDispatch();

    return (
        <Link
            onClick={() => dispatch(toggleNav())}
            className={`flex h-12 xl:h-14 items-center gap-2 ${pathName === path && 'bg-accent lg:bg-transparent rounded font-bold block w-full'}`} href={path}
        >
            <Icon className="w-5 h-5" />
            <span>{title}</span>
        </Link>
    );
};

export default NavLink;