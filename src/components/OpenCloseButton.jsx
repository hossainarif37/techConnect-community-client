import { AiOutlineMenu } from "react-icons/ai";
import { toggle } from "../states/state";
import { IoMdClose } from "react-icons/io";

const OpenCloseButton = () => {
    const handleNavToggle = () => {
        toggle.value = !toggle.value;
    }
    return (
        <>
            {
                !toggle.value
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