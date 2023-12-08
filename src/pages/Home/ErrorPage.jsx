import { useEffect } from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    // useEffect(() => {
    //     window.location.reload();
    // }, [])
    console.log('render');

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-2">Page Not Found</h2>
                <p>The page you're looking for does not exist.</p>
                <div className="text-center mt-10">
                    <Link to='/' className="btn bg-primary text-white">Back to home</Link>
                </div>
            </div>
        </div >
    );
};

export default ErrorPage;