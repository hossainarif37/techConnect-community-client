import { useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void, isOpen: boolean) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            callback();
        }
    };

    useEffect(() => {
        if (isOpen) {
            addEventListener("mousedown", handleClickOutside);
        } else {
            removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]); // Re-run when isOpen changes

    return ref;
};

export default useOutsideClick;