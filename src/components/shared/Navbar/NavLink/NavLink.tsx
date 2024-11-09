"use client"
import { toggleNav } from "@/redux/slices/navbar/navbarSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

type NavLinkProps = {
    title: string;
    path: string;
}

const NavLink = ({ title, path }: NavLinkProps) => {
    const pathName = usePathname();
    const dispatch = useDispatch();

    return (
        <li onClick={() => dispatch(toggleNav())}>
            <Link
                className={`${pathName === path && 'bg-accent lg:bg-transparent rounded  font-bold py-2 block w-full'}`} href={path}>
                {title}
            </Link>
        </li>
    );
};

export default NavLink;