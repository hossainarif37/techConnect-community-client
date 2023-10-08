import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai"
import { toggle } from "../states/toggle";
import userIcon from '../assets/icons/userIcon.png'

const Navbar = () => {
    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/services'>Questions</Link></li>
        <li><Link to='/projects'>Courses</Link></li>
        <li><Link to='/contact'>Books</Link></li>
        <li><Link to='/admin/user-order'>Meetup</Link></li>
    </>

    const handleNavToggle = () => {
        toggle.value = !toggle.value;
    }

    return (
        <nav className="bg-white lg:px-20 p-3 lg:py-5 sticky top-0 z-50">
            <div className="flex justify-between items-center">

                <h1 className="flex items-center gap-3">
                    <Link to='/profile'>
                        <img src={userIcon} className="w-10" alt="" />
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
                    {/* Logout Button */}
                    <button onClick={() => { }} className="border px-10 py-2 hidden lg:block">Logout</button>
                </div>
                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    {/*//? Navbar Button */}
                    <button
                        className="text-3xl pt-2"
                        onClick={handleNavToggle}
                    >
                        <AiOutlineMenu />
                    </button>
                    <ul className={`shadow-xl  bg-white absolute text-center rounded-md w-48 p-5 duration-300 right-0 space-y-3 ${toggle.value ? 'right-0' : '-right-56'} `}>
                        {menuItems}
                        {/* Logout Button */}
                        <button onClick={() => { }} className="border px-10 py-1">Logout</button>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;