import { useEffect, useRef, useState } from "react";
import { categories } from "../../assets/data/data";
import UserImage from "./UserImage";
import { Icon } from "@iconify/react";

// eslint-disable-next-line react/prop-types
const CustomModal = ({ isModalOpen, closeModal }) => {
    const [textareaRows, setTextareaRows] = useState(5); // Initial number of rows
    const [isExistText, setIsExistText] = useState(false);

    const textareaRef = useRef(null);

    useEffect(() => {
        // Focus on the textarea when the modal is opened
        if (isModalOpen) {
            textareaRef.current.focus();
        }
    }, [isModalOpen]);

    // Handle Text Area Change
    const handleTextareaChange = (e) => {
        if (e.target.value) {
            setIsExistText(true)
        } else {
            setIsExistText(false)
        }
        if (textareaRows !== 8) {
            // Calculate the number of rows dynamically based on the textarea content
            const numberOfLineBreaks = (e.target.value.match(/\n/g) || []).length;
            setTextareaRows(Math.max(numberOfLineBreaks + 1, 5)); // Set a minimum of 4 rows
        }
    };

    return (
        <>
            <div className={`${isModalOpen ? "scale-100" : "scale-0"}  bg-black bg-opacity-30 top-0 flex items-center justify-center w-full z-50 h-screen fixed right-0`}>

                {/*//* Modal Body */}
                <div className={`bg-white lg:w-2/5 lg:mt-20 xl:mt-10 p-5 duration-300 rounded-xl ${isModalOpen ? "scale-100" : "scale-0"}`}>


                    {/* Modal Heading Start */}
                    <div className="flex justify-between items-center">

                        <div className='flex gap-x-5 items-center'>

                            {/* User Image */}
                            <UserImage modal={true} />

                            <div>
                                {/* User Name */}
                                <h2 className='text-xl text-black-secondary font-bold'>Md Arif</h2>

                                {/* Topics Category Select */}
                                <select
                                    className=' p-1 mt-1 outline-none border border-secondary rounded-lg cursor-pointer hover:bg-white-secondary duration-100' name="category" id="">
                                    {
                                        categories?.map((category, i) => <option
                                            key={i}
                                            value={category}
                                        >
                                            {category}
                                        </option>)
                                    }
                                </select>
                            </div>

                        </div>

                        {/* Modal Close Button */}
                        <button onClick={closeModal} className="cursor-pointer text-5xl hover:text-black-secondary duration-200">
                            <Icon icon="carbon:close-filled" />
                        </button>

                    </div>
                    {/* Modal Heading End */}

                    {/* Modal Textarea */}
                    <div className="mt-4">
                        <textarea className='w-full outline-none text-2xl font-sans font-semibold placeholder:font-normal text-black-secondary' placeholder='Write here...'
                            ref={textareaRef}
                            name="" id=""
                            cols="30"
                            rows={textareaRows}
                            onChange={handleTextareaChange}
                        ></textarea>
                    </div>

                    {/* Modal Submit Button */}
                    <div className="mt-4 flex justify-end">
                        <button
                            disabled={!isExistText}
                            type="button"
                            className={` ${!isExistText ? "btn-disabled" : "btn bg-secondary hover:border-secondary text-white hover:bg-transparent  hover:text-black-secondary"} select-none   xl:py-4 lg:py-3  w-full  font-bold`}
                            onClick={closeModal}
                        >
                            Post
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default CustomModal;