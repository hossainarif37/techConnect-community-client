import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/Home/ErrorPage";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
])