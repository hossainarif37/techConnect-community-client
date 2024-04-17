import { AiOutlineLoading3Quarters } from "react-icons/ai";


type LoadingRoundPropsType = {
    paddingY: string; // Example: 'py-2'
    textSize?: string; // Example: 'text-lg'
    textColor?: string; // Example: 'text-blue-500'
}

const LoadingRound = ({ paddingY, textColor, textSize }: LoadingRoundPropsType) => {
    return (
        <div className={`flex justify-center ${paddingY}`}>
            <AiOutlineLoading3Quarters
                className={`animate-spin ${textColor} ${textSize}`}
            />
        </div>
    );
};

export default LoadingRound;