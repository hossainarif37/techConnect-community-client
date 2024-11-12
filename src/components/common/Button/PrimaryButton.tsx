import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string
}

const PrimaryButton = ({children, className, ...props }: PrimaryButtonProps) => {
    return (
        <button {...props} className={cn("lg:px-10 px-5 py-2.5 duration-300 rounded-lg", className)}>
            {children}
        </button>
    );
};

export default PrimaryButton;