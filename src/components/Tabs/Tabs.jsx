import { NavLink } from "react-router-dom";
import TabCss from "./Tabs.module.css"

const Tabs = () => {
    return (
        <div className={`mt-10 grid md:grid-cols-5  justify-center gap-7 ${TabCss.navlink}`}>
            <NavLink to='posts'>Posts</NavLink>
            <NavLink to='questions'>Questions</NavLink>
            <NavLink to='saved'>Saved</NavLink>
            <NavLink to='books'>Books</NavLink>
            <NavLink t0='courses'>Courses</NavLink>
        </div>
    );
};

export default Tabs;