import { cn } from "@/lib/utils";
import React from "react";

export const renderContentWithBr = (...args: [text: string, className?: string]) => {
    const [text, className] = args;
    const lines = text?.split('\n');
    return lines?.map((line, index) => {
        // Only add a <br /> if there is text after the newline
        if (line.trim() === '' && index < lines?.length - 1) {
            return <br key={index} />;
        }
        return (
            <React.Fragment key={index}>
                <p className={cn("text-[#f3f3f3] break-words", className)}>
                    {line}
                </p>
            </React.Fragment>
        );
    });
};
