import profile_blank_image from "../../../assets/images/profile_blank_image.png";


const NewsFeed = () => {
    return (
        <section className="bg-accent">
            <div>
                <div className="w-20">
                    <img src={profile_blank_image} alt="" />
                </div>
                <button type="button">Share Your Experience</button>
            </div>
        </section>
    );
};

export default NewsFeed;