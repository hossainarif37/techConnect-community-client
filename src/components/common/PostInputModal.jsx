import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import UserImage from './UserImage';
import { categories } from '../../assets/data/data';

const PostInputModal = ({ isModalOpen, closeModal }) => {
    const [textareaRows, setTextareaRows] = useState(4); // Initial number of rows

    const handleTextareaChange = (e) => {
        if (textareaRows !== 12) {
            // Calculate the number of rows dynamically based on the textarea content
            const numberOfLineBreaks = (e.target.value.match(/\n/g) || []).length;
            setTextareaRows(Math.max(numberOfLineBreaks + 1, 4)); // Set a minimum of 4 rows
        }
    };

    return (
        <>
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <div className='flex gap-x-5 items-center'>
                                        {/* User Image */}
                                        <UserImage modal={true} />

                                        <div>
                                            <h2 className='text-xl text-black-secondary font-bold'>Md Arif</h2>
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
                                    <div className="mt-4">
                                        <textarea className='w-full outline-none text-lg' placeholder='Write here...'
                                            name="" id=""
                                            cols="30"
                                            rows={textareaRows}
                                            onChange={handleTextareaChange}
                                        ></textarea>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default PostInputModal;