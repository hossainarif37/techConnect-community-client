import HashLoader from "react-spinners/HashLoader"

const CustomLoading = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <HashLoader
                color="#36d7b7"
                size={75}
            />
        </div>
    );
};

export default CustomLoading;