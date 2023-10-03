import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="h-screen">
            <h2>Error: Page Not Found</h2>
            <p>The page you're looking for does not exist.</p>
            <Link to='/'>Back to home</Link>
        </div>
    );
};

export default ErrorPage;