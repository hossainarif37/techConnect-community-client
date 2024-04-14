import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingRound = () => {
    return (
        <div className="flex justify-center py-4">
            <AiOutlineLoading3Quarters
                className="animate-spin text-2xl"
            />
        </div>
    );
};

export default LoadingRound;