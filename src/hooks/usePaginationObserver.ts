import { useEffect, useRef, useCallback } from "react";

interface UsePaginationObserverProps {
  isLoading: boolean;
  data: any;
  setIsIntersecting: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isIntersecting: boolean;
}

const usePaginationObserver = ({
  isLoading,
  data,
  setIsIntersecting,
  setPage,
  isIntersecting,
}: UsePaginationObserverProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerOptions = { threshold: 1 };

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && data?.hasMore && !isLoading && !isIntersecting) {
        setIsIntersecting(true);
        setPage((prevPage) => prevPage + 1);
      }
    },
    [data, isLoading, isIntersecting, setIsIntersecting, setPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const currentContainerRef = containerRef.current;

    if (currentContainerRef) {
      observer.observe(currentContainerRef);
    }

    return () => {
      if (currentContainerRef) observer.unobserve(currentContainerRef);
    };
  }, [containerRef, handleIntersection]);

  return containerRef;
};

export default usePaginationObserver;
