import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { baseURL, loading, token, user } from "../states/state";
import { useEffect, useRef } from "react";
import { getData } from "../hooks/useApi";

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const effectRun = useRef(false);
    //* Get the current user from database
    useEffect(() => {
        if (effectRun.current === false) {
            const fetchUser = () => {
                fetch(baseURL + '/api/user/current-user', {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        if (!res.ok) {
                            loading.value = false;
                            token.value = '';
                            localStorage.removeItem('token');
                            throw new Error('Failed to fetch user data');
                        }
                        return res.json();
                    })
                    .then(data => {
                        loading.value = false;
                        if (data.success) {
                            user.value = data.user;
                            // localStorage.setItem('token', data.token);
                        } else {
                            throw new Error('User data not available');
                        }
                    })
                    .catch(error => {
                        loading.value = false;
                        console.error('Error fetching user data:', error);
                        // Handle the error appropriately, e.g., show an error message to the user
                    });
            }
            fetchUser()


            return () => effectRun.current = true;
        }

    }, []);
    console.log(loading.value);
    if (loading.value) {
        return <p>loading...</p>
    }

    if (!user.value) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children;

};

export default RequireAuth;