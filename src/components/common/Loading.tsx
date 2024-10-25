import { cn } from "@/lib/utils";
import { HashLoader } from "react-spinners";

interface LoadingProps {
    className?: string
}

const Loading = ({className}:LoadingProps) => {
    return (
        <div className={cn("h-screen flex justify-center items-center", className)}>
            <HashLoader color="#36d7b7" />
        </div>
    );
};

export default Loading;