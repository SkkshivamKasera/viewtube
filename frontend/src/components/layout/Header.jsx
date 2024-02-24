import React from 'react'
import { HiBars3 } from "react-icons/hi2"
import { FaMagnifyingGlass, FaYoutube } from "react-icons/fa6"
import { BiVideoPlus } from "react-icons/bi"
import { IoMdNotificationsOutline } from "react-icons/io"
import { Link } from 'react-router-dom';
import { REQUEST_URL } from '../../redux/store'
import { useSelector } from 'react-redux'

const Header = ({ activeSideDrawer, barRef, isAuthenticated }) => {

    const { user } = useSelector(state => state.user)

    const handleLogin = async () => {
        window.open(`${REQUEST_URL}/google_login`, "_self")
    }

    return (
        <nav className='flex items-center justify-between w-full h-16 shadow-md sticky top-0 z-10 bg-white'>
            <div className='flex items-center'>
                <div className='flex items-center justify-center w-8 h-8 p-1 rounded-full hover:bg-gray-200 cursor-pointer ml-5' ref={barRef} onClick={() => activeSideDrawer(true)}>
                    <HiBars3 className='size-10' />
                </div>
                <Link to={"/"} title='youtube home' className='flex items-center ml-2 font-extrabold text-lg'><FaYoutube color='red' className='mr-2' />YOUTUBE</Link>
            </div>
            <div className='hidden md:flex items-center w-[50%] relative'>
                <input type='text' placeholder='search' className='flex items-center w-full rounded-2xl px-5 py-1 capitalize border border-gray-500 outline-none' />
                <div className='absolute right-0 px-2 flex justify-center items-center h-full border-l-2 border-gray-500 cursor-pointer'>
                    <FaMagnifyingGlass />
                </div>
            </div>
            {
                isAuthenticated ? (
                    <div className='flex items-center'>
                        <Link to={"/video/upload"} className='flex items-center justify-center w-8 h-8 p-1 rounded-full hover:bg-gray-200 cursor-pointer mr-5'>
                            <BiVideoPlus className='size-10' />
                        </Link>
                        <Link to={"/channel/notification"} className='flex items-center justify-center w-8 h-8 p-1 rounded-full hover:bg-gray-200 cursor-pointer mr-5'>
                            <IoMdNotificationsOutline className='size-10' />
                        </Link>
                        <Link to={"/channel/me"} className='flex items-center justify-center w-10 h-10 p-1 rounded-full hover:bg-gray-200 cursor-pointer mr-5'>
                            <img src={user && user.avatar} alt='user profile' className='rounded-full' />
                        </Link>
                    </div>
                ) : (
                    <div>
                        <button onClick={handleLogin} className='flex items-center mr-5 px-4 py-2 bg-red-700 text-white rounded-md uppercase'>sign in</button>
                    </div>
                )
            }
        </nav>
    )
}

export default Header
