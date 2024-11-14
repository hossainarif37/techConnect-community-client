import { useEffect, useRef } from "react";

interface UsePaginationObserverProps {
    data: any;
    page: number;
    isLoading: boolean;
    isLoadingMore: boolean;
    setIsLoadingMore: React.Dispatch<React.SetStateAction<boolean>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const usePaginationObserver = ({ data, page, isLoading, setIsLoadingMore, setPage, isLoadingMore }: UsePaginationObserverProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const observerOptions = { threshold: 0.1 };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        if (entry.isIntersecting && data?.hasMore && !isLoading && !isLoadingMore) {
            setIsLoadingMore(true);
            setPage(prevPage => prevPage + 1);
        }else if (!data?.hasMore) {
            setIsLoadingMore(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        const currentContainerRef = containerRef.current;

        if (currentContainerRef) {
            observer.observe(currentContainerRef);
        }

        return () => {
            if (currentContainerRef) observer.unobserve(currentContainerRef);
        };
    }, [containerRef, page, isLoading, isLoadingMore]);

    return containerRef;
};

export default usePaginationObserver;
