import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/Home/ErrorPage";
import Home from "../pages/Home/Home";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import RequireAuth from "../Auth/RequireAuth";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth><App /></RequireAuth>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
        ]
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
])