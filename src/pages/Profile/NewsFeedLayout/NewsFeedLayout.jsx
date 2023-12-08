import CatergorySideBar from "./CatergorySideBar";
import NewsFeed from "./NewsFeed";

const NewsFeedLayout = () => {
    return (
        <div className="flex mt-3">
            <CatergorySideBar />
            <NewsFeed/>
        </div>
    );
};

export default NewsFeedLayout;