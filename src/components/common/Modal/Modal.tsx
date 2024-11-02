import { cn } from "@/lib/utils";

interface IModalProps {
    children: React.ReactNode,
    isModalOpen: boolean;
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    containerClassName?: string;
    contentClassName?: string;
}


const Modal = ({  isModalOpen, setIsModalOpen, containerClassName, contentClassName, children }: IModalProps) => {
    return (
        <div className={cn(`${isModalOpen ? "scale-100" : "scale-0"} px-3 md:px-5 bg-primary bg-opacity-70 top-0 flex items-center justify-center w-full z-50 h-screen fixed right-0`, containerClassName)}>
            <div className={cn("bg-secondary rounded-xl flex p-3 lg:px-10 lg:py-5 xl:py-10 xl:px-10 gap-5 w-full mx-auto lg:w-[500px] xl:w-[650px]", contentClassName)}>
                {children}
            </div>
        </div>
    );
};

export { Modal };