import Tabs from "../../components/Tabs/Tabs";
import NewsFeedLayout from "./NewsFeedLayout/NewsFeedLayout";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
    return (
        <div>
            <ProfileHeader />
            <hr className="mt-5"/>
            <div className="container-md">
            <Tabs />
            <NewsFeedLayout/>
            </div>
        </div>
    );
};

export default Profile;