import CatergorySideBar from "../Components/CategorySideBar";
import NewsFeed from "../Components/NewsFeed";

const NewsFeedLayout = () => {
    return (
        <div className="flex flex-col lg:flex-row mt-3">
            <CatergorySideBar />
            <NewsFeed />
        </div>
    );
};

export default NewsFeedLayout;