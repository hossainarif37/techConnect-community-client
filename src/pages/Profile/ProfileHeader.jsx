import profile_blank_image from "../../assets/images/profile_blank_image.png"

const ProfileHeader = () => {
    return (
        <section >
            {/* Wrapper */}
            <div className="lg:w-[750px] mx-auto flex flex-col lg:flex-row items-center">
                {/*-------- Profile Header Left ---------*/}
                <div className="w-48 mr-5">
                    <img
                        className="w-full"
                        src={profile_blank_image} alt="" />
                </div>
                {/*-------- Profile Header Right ---------*/}
                <div className="flex flex-1 justify-between gap-7 lg:gap-0 items-center">
                    <div>
                        <h4 className="font-bold text-gray">Display Name</h4>
                        <h4>0 Follwers</h4>
                        <h4>0 Following</h4>
                    </div>
                    <button className="btn font-semibold border border-accent">Change Photo</button>
                </div>
            </div>
        </section>
    );
};

export default ProfileHeader;