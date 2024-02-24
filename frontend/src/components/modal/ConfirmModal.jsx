import React, { useEffect, useRef } from 'react'

const ConfirmModal = ({ modalOpen, setModalOpen, buttonRef, message, buttonText, handleFunction, setIsSubscribing }) => {

    const modalContentRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                modalContentRef.current &&
                !modalContentRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setModalOpen(false);
            }
        };
    
        if (modalOpen) {
            document.addEventListener("click", handleClickOutside);
            document.body.style.overflow = "hidden";
        } else {
            document.removeEventListener("click", handleClickOutside);
            document.body.style.overflow = "auto";
        }
    
        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.body.style.overflow = "auto";
        };
    }, [modalOpen]);    

    return (
        <div className={`${modalOpen ? "fixed" : "hidden"} w-full left-0 h-full top-0 bg-black bg-opacity-50 z-20 flex items-center justify-center`}>
            <div className={`${modalOpen ? "" : "hidden"} bg-white flex flex-col items-center p-4 rounded-lg shadow-lg transition ease-in-out delay-100 duration-100`} ref={modalContentRef}>
                <div>
                    <h2 className='text-[18px] capitalize text-center'>{message}</h2>
                    <div className='w-full flex items-center justify-between px-4 mt-5'>
                        <button className='px-5 py-2 rounded-full capitalize cursor-pointer text-black w-full hover:bg-gray-200'  onClick={()=>setModalOpen(!modalOpen)}>cancle</button>
                        <button onClick={() => {
                            handleFunction()
                            if(setIsSubscribing){
                                setIsSubscribing(true)
                            }
                            setModalOpen(false)
                        }} className='px-5 py-2 rounded-full capitalize cursor-pointer hover:bg-gray-200 text-blue-700 font-bold w-full ml-2'>{buttonText}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal