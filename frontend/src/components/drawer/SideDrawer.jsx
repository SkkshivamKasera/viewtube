import React, { Fragment } from 'react'
import { GoHome, GoHomeFill, GoHistory } from "react-icons/go"
import { SiYoutubeshorts } from "react-icons/si"
import { MdOutlineSubscriptions, MdSubscriptions, MdWatchLater, MdOutlineWatchLater } from "react-icons/md"
import { RiHistoryFill, RiAccountBoxLine, RiAccountBoxFill } from "react-icons/ri"
import { PiVideoFill, PiVideoLight } from "react-icons/pi"
import { FaChevronRight, FaYoutube } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { HiBars3 } from "react-icons/hi2"

const SideDrawer = ({ drawerRef, activeSideDrawerLink, setActiveSideDrawerLink, activeSideDrawer }) => {
    return (
        <Fragment>
            <div ref={drawerRef} id='sidedrawer' className='w-52 px-4 h-[100vh] fixed -left-1/2 top-0 z-10 shadow-lg bg-gray-100 transition-all delay-100 ease-in-out duration-200'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-center w-8 h-8 p-1 rounded-full hover:bg-gray-200 cursor-pointer' onClick={()=>activeSideDrawer(false)}>
                        <HiBars3 className='size-10' />
                    </div>
                    <Link to={"/"} title='youtube home' className='flex items-center ml-2 font-extrabold text-lg'><FaYoutube color='red' className='mr-2' />YOUTUBE</Link>
                </div>
                <ul className='mt-2 mb-2 space-y-2'>
                    <Link to={"/"} onClick={() => setActiveSideDrawerLink("home")} className={`flex items-center p-2 w-full rounded-md ${activeSideDrawerLink === "home" ? " bg-gray-200" : "bg-white"} hover:bg-gray-200`}>
                        <li className='flex items-center cursor-pointer'>
                            {activeSideDrawerLink === "home" ? <GoHomeFill /> : <GoHome />}
                            <span className={`${activeSideDrawerLink === "home" ? "font-bold" : "font-normal"} ml-2 capitalize`}>
                                home
                            </span>
                        </li>
                    </Link>
                    <Link to={"/shorts"} onClick={() => setActiveSideDrawerLink("shorts")} className={`flex items-center p-2 w-full rounded-md ${activeSideDrawerLink === "shorts" ? " bg-gray-200" : "bg-white"} hover:bg-gray-200`}>
                        <li className='flex items-center cursor-pointer'>
                            {activeSideDrawerLink === "shorts" ? <SiYoutubeshorts /> : <SiYoutubeshorts />}
                            <span className={`${activeSideDrawerLink === "shorts" ? "font-bold" : "font-normal"} ml-2 capitalize`}>
                                shorts
                            </span>
                        </li>
                    </Link>
                    <Link to={"/subscriptions"} onClick={() => setActiveSideDrawerLink("subscriptions")} className={`flex items-center p-2 w-full rounded-md ${activeSideDrawerLink === "subscriptions" ? " bg-gray-200" : "bg-white"} hover:bg-gray-200`}>
                        <li className='flex items-center cursor-pointer'>
                            {activeSideDrawerLink === "subscriptions" ? <MdSubscriptions /> : <MdOutlineSubscriptions />}
                            <span className={`${activeSideDrawerLink === "subscriptions" ? "font-bold" : "font-normal"} ml-2 capitalize`}>
                                subscriptions
                            </span>
                        </li>
                    </Link>
                    <hr className="mt-3 mb-3" />
                    <Link to={"/channel/me"} onClick={() => setActiveSideDrawerLink("you")} className={`flex items-center p-2 w-full rounded-md ${activeSideDrawerLink === "you" ? " bg-gray-200" : "bg-white"} hover:bg-gray-200`}>
                        <li className='flex items-center cursor-pointer'>
                            <span className='capitalize'>You</span><FaChevronRight className='ml-2 size-3'/>
                        </li>
                    </Link>
                    <Link to={"/channel/me"} onClick={() => setActiveSideDrawerLink("yourchannel")} className={`flex items-center p-2 w-full rounded-md ${activeSideDrawerLink === "yourchannel" ? " bg-gray-200" : "bg-white"} hover:bg-gray-200`}>
                        <li className='flex items-center cursor-pointer'>
                            {activeSideDrawerLink === "yourchannel" ? <RiAccountBoxFill /> : <RiAccountBoxLine />}
                            <span className={`${activeSideDrawerLink === "yourchannel" ? "font-bold" : "font-normal"} ml-2 capitalize`}>
                                your channel
                            </span>
                        </li>
                    </Link>
                    <Link to={"/channel/me"} onClick={() => setActiveSideDrawerLink("yourvideos")} className={`flex items-center p-2 w-full rounded-md ${activeSideDrawerLink === "yourvideos" ? " bg-gray-200" : "bg-white"} hover:bg-gray-200`}>
                        <li className='flex items-center cursor-pointer'>
                            {activeSideDrawerLink === "yourvideos" ? <PiVideoFill /> : <PiVideoLight />}
                            <span className={`${activeSideDrawerLink === "yourvideos" ? "font-bold" : "font-normal"} ml-2 capitalize`}>
                                your videos
                            </span>
                        </li>
                    </Link>
                    <Link to={"/watch/history"} onClick={() => setActiveSideDrawerLink("history")} className={`flex items-center p-2 w-full rounded-md ${activeSideDrawerLink === "history" ? " bg-gray-200" : "bg-white"} hover:bg-gray-200`}>
                        <li className='flex items-center cursor-pointer'>
                            {activeSideDrawerLink === "history" ? <RiHistoryFill /> : <GoHistory />}
                            <span className={`${activeSideDrawerLink === "history" ? "font-bold" : "font-normal"} ml-2 capitalize`}>
                                history
                            </span>
                        </li>
                    </Link>
                    <Link to={"/channel/me"} onClick={() => setActiveSideDrawerLink("watchlater")} className={`flex items-center p-2 w-full rounded-md ${activeSideDrawerLink === "watchlater" ? " bg-gray-200" : "bg-white"} hover:bg-gray-200`}>
                        <li className='flex items-center cursor-pointer'>
                            {activeSideDrawerLink === "watchlater" ? <MdWatchLater /> : <MdOutlineWatchLater />}
                            <span className={`${activeSideDrawerLink === "watchlater" ? "font-bold" : "font-normal"} ml-2 capitalize`}>
                                watch later
                            </span>
                        </li>
                    </Link>
                </ul>
            </div>
        </Fragment>
    )
}

export default SideDrawer