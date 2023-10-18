import { useNavigate } from "react-router-dom";
import { baseURL, loading, token, user } from "../states/state";
import { useEffect, useRef } from "react";
import { getData } from "../hooks/useApi";

// eslint-disable-next-line react/prop-types
const RequireAuth = ( ) => {
    const navigate = useNavigate();
    const effectRun = useRef(false);
    console.log('Render');
    useEffect(()=>{
        navigate('/login')
    },[navigate])

    //* Get the current user from database
    //     useEffect(() => {
    //         if (effectRun.current === false) {
    //             const fetchUser = () => {
    //                 fetch(baseURL + '/api/user/current-user', {
    //                     headers: {
    //                         authorization: localStorage.getItem('token')
    //                     }
    //                 })
    //                     .then(res => {
    //                         if (!res.ok) {
    //                             loading.value = false;
    //                             token.value = ''
    //                             localStorage.removeItem('token');
    //                             navigate('/login')
    //                         }
    //                         return res.json();
    //                     })
    //                     .then(data => {
    //                         console.log(32, data);
    //                         if (data.success) {
    //                             user.value = data.user;
    //                             localStorage.setItem('token', data.token);
    //                             return children;
    //                         }
    //                     })
    //             }
    //             fetchUser();
    //             return () => effectRun.current = true;
    //         }

    //     }, [children, navigate]);
    //    if (loading.value) {
    //     return <p>loading...</p>
    //    }

};

export default RequireAuth;