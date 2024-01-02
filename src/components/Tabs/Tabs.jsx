import { NavLink } from "react-router-dom";
import tabCss from "./tabs.module.css"

const Tabs = () => {
    return (
        <div className={`mt-3 lg:my-5 grid md:grid-cols-5  justify-center gap-3 lg:gap-7 ${tabCss.navlink}`}>
            <NavLink to='#'>Posts</NavLink>
            <NavLink to='#'>Questions</NavLink>
            <NavLink to='#'>Saved</NavLink>
            <NavLink to='#'>Books</NavLink>
            <NavLink to='#'>Courses</NavLink>
        </div>
    );
};

export default Tabs;