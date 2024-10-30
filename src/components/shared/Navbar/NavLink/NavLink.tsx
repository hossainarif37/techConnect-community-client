"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
    title: string;
    path: string;
}

const NavLink = ({ title, path }: NavLinkProps) => {
    const pathName = usePathname();

    return (
        <li >
            <Link
                className={`${pathName === path && 'bg-accent lg:bg-transparent rounded  font-bold py-2 block w-full'}`} href={path}>
                {title}
            </Link>
        </li>
    );
};

export default NavLink;