import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const OpenCloseButton = () => {
    const [isToggle, setIstoggle] = useState(false);

    const handleNavToggle = () => {
        console.log('handleNavToggle clicked');
    }
    return (
        <>
            {
                !isToggle
                    ?

                    <button
                        className="text-3xl pt-2"
                        onClick={handleNavToggle}
                    >
                        <AiOutlineMenu />
                    </button> :
                    <button
                        className="text-3xl pt-2"
                        onClick={handleNavToggle}
                    >
                        <IoMdClose />
                    </button>
            }
        </>
    );
};

export default OpenCloseButton;