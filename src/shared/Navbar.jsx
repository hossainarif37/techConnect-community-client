import { Link } from "react-router-dom";
import { toggle } from "../states/state";
import userIcon from '../assets/icons/userIcon.png'
import OpenCloseButton from "../components/OpenCloseButton";
import LoginLogoutButton from "../components/LoginLogoutButton";

const Navbar = () => {
    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='#'>Questions</Link></li>
        <li><Link to='/courses'>Courses</Link></li>
        <li><Link to='/books'>Books</Link></li>
        <li><Link to='/meetup'>Meetup</Link></li>
    </>


    return (
        <nav className="bg-white  p-3 lg:py-5 sticky top-0 z-50">
            <div className="flex container justify-between items-center">

                <h1 className="flex items-center gap-3">
                    <Link to='/profile'>
                        <img src={userIcon} className="w-14" alt="" />
                    </Link>
                    <Link to='/' className="lg:text-4xl text-3xl font-bold">
                        <span className="text-gray-800">Tech</span><span className="text-[#ff5200]">Connect</span>
                    </Link>
                </h1>
                {/* Desktop Menu */}
                <div className="lg:flex hidden items-center flex-1 justify-between">
                    <ul className="flex mx-auto space-x-10">
                        {menuItems}
                    </ul>
                    {/* Authentication Button */}
                    <LoginLogoutButton isDesktop={true} />
                </div>
                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    {/*//? Navbar Button */}
                    <OpenCloseButton />
                    <ul className={`shadow-xl  bg-white absolute text-center border-t rounded-md w-60 p-5 duration-300 h-screen top-0 space-y-3 right-0 origin-right ${toggle.value ? 'scale-x-100' : 'scale-x-0'}`}>
                        {/*//? Navbar Button */}
                        <div className="w-full text-right">
                            <OpenCloseButton />
                        </div>
                        {menuItems}
                        {/* Authentication Button */}
                        <LoginLogoutButton isDesktop={false} />
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;