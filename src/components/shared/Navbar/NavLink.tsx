import Link from "next/link";

type NavLinkProps = {
    title: string;
    path: string;
}

const NavLink = ({ title, path }: NavLinkProps) => {
    return (
        <li>
            <Link href={path}>
                {title}
            </Link>
        </li>
    );
};

export default NavLink;