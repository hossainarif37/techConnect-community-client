import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


type LoadingRoundPropsType = {
className?: string;    
}

const LoadingRound = ({ className}: LoadingRoundPropsType) => {
    return (
        <div className={cn('flex justify-center', className)}>
            <AiOutlineLoading3Quarters
                className={`animate-spin`}
            />
        </div>
    );
};

export default LoadingRound;