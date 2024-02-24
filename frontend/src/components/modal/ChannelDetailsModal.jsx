import React, { useEffect, useRef } from 'react'
import { FaX } from 'react-icons/fa6'
import { FiPhone } from "react-icons/fi"
import { CiGlobe } from "react-icons/ci"
import { RiUserVoiceLine } from "react-icons/ri"
import { IoIosTrendingUp } from "react-icons/io"
import { IoMdInformationCircleOutline } from "react-icons/io"
import { PiVideoLight } from "react-icons/pi"
import { formatValue } from '../../logics'
import { FRONTEND_URL } from '../../redux/store'

const ChannelDetailsModal = ({ buttonRef, modalOpen, setModalOpen, user }) => {

    const modalRef = useRef(null)

    useEffect(() => {
        const handleClickOutSide = (event) => {
            if ((modalRef.current || buttonRef.current) && (!modalRef.current.contains(event.target) && !buttonRef.current.contains(event.target))) {
                setModalOpen(false)
            }
        }
        document.addEventListener("click", handleClickOutSide)
        document.body.style.overflow = modalOpen ? "hidden" : "auto"
        return () => {
            document.removeEventListener("click", handleClickOutSide)
            document.body.style.overflow = "auto"
        }
    }, [modalOpen, buttonRef, setModalOpen])

    let views = 0

    user && user.videos && user.videos.map((video) => {
        views += video.views
    })

    return (
        user && (
            <div className='fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-20 flex items-center justify-center'>
                <div ref={modalRef} className='bg-white w-1/2 rounded-lg shadow shadow-gray-500'>
                    <div className='p-4 flex items-center justify-between'>
                        <h1 className='text-2xl text-black font-bold capitalize'>About</h1>
                        <span onClick={() => setModalOpen(!modalOpen)} className='w-10 h-10 rounded-full active:bg-gray-200 flex items-center justify-center cursor-pointer'>
                            <FaX />
                        </span>
                    </div>
                    <div>
                        <h2 className='px-4 text-2xl text-black font-bold capitalize'>Channel Details</h2>
                        <ul>
                            <li className='flex items-center px-4 my-4'>
                                <FiPhone />
                                <span className='mx-2'>{user.email}</span>
                            </li>
                            <li className='flex items-center px-4 my-4'>
                                <CiGlobe />
                                <span className='mx-2'>{`${FRONTEND_URL}/channel/user/${user._id}`}</span>
                            </li>
                            <li className='flex items-center px-4 capitalize my-4'>
                                <RiUserVoiceLine />
                                <span className='mx-2'>{formatValue(user.subscribers)} subscribers</span>
                            </li>
                            <li className='flex items-center px-4 capitalize my-4'>
                                <PiVideoLight />
                                <span className='mx-2'>{user.videos ? formatValue(user.videos.length) : 0} videos</span>
                            </li>
                            <li className='flex items-center px-4 capitalize my-4'>
                                <IoIosTrendingUp />
                                <span className='mx-2'>{formatValue(views)} views</span>
                            </li>
                            <li className='flex items-center px-4 capitalize my-4'>
                                <IoMdInformationCircleOutline />
                                <span className='mx-2'>joined on {user.createdAt && user.createdAt.split("T")[0]}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    )
}

export default ChannelDetailsModal
