import { Link, Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import { baseURL, loading, toggle, token, user } from "./states/state";
import { useEffect, useRef } from "react";
import CustomLoading from "./components/common/CustomLoading";

const App = () => {
  const effectRun = useRef(false);

  const handleToggle = () => {
    toggle.value = false
  }

  //* Get the current user from the database
  useEffect(() => {
    if (!effectRun.current) {
      const fetchUser = async () => {
        try {
          const res = await fetch(baseURL + '/api/user/current-user', {
            headers: {
              authorization: localStorage.getItem('token'),
            },
          });

          if (!res.ok) {
            loading.value = false;
            token.value = '';
            localStorage.removeItem('token');
            throw new Error('Failed to fetch user data');
          }

          const data = await res.json();

          loading.value = false;
          if (data.success) {
            user.value = data.user;
            // localStorage.setItem('token', data.token);
          } else {
            throw new Error('User data not available');
          }
        } catch (error) {
          loading.value = false;
          console.error('Error fetching user data:', error);
        }
      };

      fetchUser();
      effectRun.current = true;
    }
  }, []);

  console.log(loading.value);

  // if (loading.value) return <CustomLoading />

  return (
    <div className="relative">
      <Navbar />
      <main onClick={handleToggle}>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
