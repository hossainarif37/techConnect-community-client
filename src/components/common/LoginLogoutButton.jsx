import { LuLogOut } from "react-icons/lu";
import { user } from "../../states/state";
import { useNavigate } from "react-router-dom";

const LoginLogoutButton = ({ isDesktop }) => {
    const navigate = useNavigate();
    return (
        <>
            {
                user.value ?
                    <button onClick={() => {
                        localStorage.removeItem('token');
                        user.value = null;
                        // navigate('/')
                    }}
                        className={`${!isDesktop && 'w-full'} btn border-black flex items-center justify-center gap-2`}>
                        <span>Logout</span>
                        <span className="mt-[2px]"><LuLogOut /></span>
                    </button>
                    :
                    <button onClick={() => {
                        navigate('/login')
                    }} className={`${!isDesktop && 'w-full'}  btn border-primary hover:bg-primary hover:text-white`}>Login</button>
            }
        </>
    );
};

export default LoginLogoutButton;