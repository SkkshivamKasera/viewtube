import React, { Fragment, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { ChannelDetailsModal, HorizontalScrollVideoCard, NotItem, SubscriptionCard } from '../../components';
import { useSelector } from 'react-redux';
import { formatValue } from '../../logics';

const MyProfile = () => {
    const { user } = useSelector(state => state.user);

    const videosDivRef = useRef(null);
    const subscriptionsDivRef = useRef(null);
    const watchLaterDivRef = useRef(null);
    const buttonRef = useRef(null);

    const [channelDetailsModalOpen, setChannelDetailsModalOpen] = useState(null);

    const scrollLeft = (scrollValue, div_1, div_2, div_3) => {
        const divRef = div_1 ? videosDivRef.current : div_2 ? subscriptionsDivRef.current : watchLaterDivRef.current;
        if (divRef) divRef.scrollLeft -= scrollValue;
    };

    const scrollRight = (scrollValue, div_1, div_2, div_3) => {
        const divRef = div_1 ? videosDivRef.current : div_2 ? subscriptionsDivRef.current : watchLaterDivRef.current;
        if (divRef) divRef.scrollLeft += scrollValue;
    };

    return (
        <div className='w-full h-full flex justify-center py-5'>
            <div className='w-full lg:w-[80%] py-2'>
                <div className='lg:max-h-64 mx-10 flex flex-col lg:flex-row items-center'>
                    <Link to={""} className='w-[200px] h-[200px] flex items-center justify-center lg:w-80 lg:h-60 rounded-[100%]'>
                        <img src={user && user.avatar} alt='profile pic' className='h-full rounded-[100%] object-cover origin-center' />
                    </Link>
                    <div className='flex flex-col justify-between w-full items-center lg:items-start my-2 lg:mx-4'>
                        <div className='uppercase text-xl lg:text-3xl font-semibold my-2'>{user ? user.channelName : "example channel name"}</div>
                        <div className='text-gray-700 capitalize flex lg:block my-2'>
                            <span>{user ? user.username : "@username"}</span>
                            <span className='mx-2'>•</span>
                            <span>{user ? formatValue(user.subscribers) : 0} subscribers</span>
                            <span className='mx-2'>•</span>
                            <span>{user ? user.videos && formatValue(user.videos.length) : 0} videos</span>
                        </div>
                        <button className='flex items-center capitalize cursor-pointer my-2 relative' ref={buttonRef} onClick={() => setChannelDetailsModalOpen(!channelDetailsModalOpen)}>
                            more about this channel <FaChevronRight className='ml-2' />
                        </button>
                        {
                            channelDetailsModalOpen &&
                            <ChannelDetailsModal buttonRef={buttonRef} modalOpen={channelDetailsModalOpen} setModalOpen={setChannelDetailsModalOpen} user={user} />
                        }
                        <div className='flex items-center my-2'>
                            <Link to={"/channel/me/edit/channel"} className='px-4 py-2 bg-gray-200 rounded-full capitalize hover:bg-gray-500 hover:text-white'>customise channel</Link>
                            <Link to={"/channel/me/edit/videos"} className='px-4 py-2 bg-gray-200 rounded-full capitalize hover:bg-gray-500 hover:text-white ml-2'>manage videos</Link>
                        </div>
                    </div>
                </div>
                <hr className='my-4' />
                <div>
                    <h1 className='px-4 text-3xl text-black capitalize py-4 font-bold'>Your Videos</h1>
                    {(user && user.videos && user.videos.length > 0) ? (
                        <Fragment>
                            <div className='relative w-full flex items-center scrollbar-hidden lg:overflow-hidden'>
                                <div className='hidden lg:flex absolute left-0 w-10 h-10 rounded-full items-center justify-center bg-white shadow shadow-gray-500 cursor-pointer' onClick={() => scrollLeft(700, true)}>
                                    <FaChevronLeft />
                                </div>
                                <div ref={videosDivRef} className='flex items-center overflow-x-auto scroll-smooth'>
                                    {user.videos.map(video => (
                                        <HorizontalScrollVideoCard key={video._id} videoID={video._id} thumbnail={video.thumbnail} title={video.title} views={video.views} createdAt={video.createdAt} />
                                    ))}
                                </div>
                                <div className='hidden lg:flex absolute right-0 w-10 h-10 rounded-full items-center justify-center bg-white shadow shadow-gray-500 cursor-pointer' onClick={() => scrollRight(700, true)}>
                                    <FaChevronRight />
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <NotItem className={'w-full min-h-24 flex items-center justify-center bg-gray-200 rounded-lg text-xl uppercase text-red-600 font-bold'} text={"no videos"} />
                    )}
                    <h1 className='px-4 text-3xl text-black capitalize py-4 font-bold'>Your subscriptions</h1>
                    {(user && user.subscriptions && user.subscriptions.length > 0) ? (
                        <Fragment>
                            <div className='relative w-full flex items-center scrollbar-hidden lg:overflow-hidden'>
                                <div className='hidden lg:flex absolute left-0 w-10 h-10 rounded-full items-center justify-center bg-white shadow shadow-gray-500 cursor-pointer' onClick={() => scrollLeft(700, false, true, false)}>
                                    <FaChevronLeft />
                                </div>
                                <div ref={subscriptionsDivRef} className='flex items-center overflow-x-auto scroll-smooth'>
                                    {user.subscriptions.map(subscription => (
                                        <SubscriptionCard
                                            key={subscription._id}
                                            channelID={subscription._id}
                                            avatar={subscription.avatar}
                                            channelName={subscription.channelName}
                                            subscribers={subscription.subscribers}
                                        />
                                    ))}
                                </div>
                                <div className='hidden lg:flex absolute right-0 w-10 h-10 rounded-full items-center justify-center bg-white shadow shadow-gray-500 cursor-pointer' onClick={() => scrollRight(700, false, true, false)}>
                                    <FaChevronRight />
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <NotItem className={'w-full min-h-24 flex items-center justify-center bg-gray-200 rounded-lg text-xl uppercase text-red-600 font-bold'} text={"no subscriptions"} />
                    )}
                    <h1 className='px-4 text-3xl text-black capitalize py-4 font-bold'>watch later videos</h1>
                    {(user && user.watch_later && user.watch_later.length > 0) ? (
                        <Fragment>
                            <div className='relative w-full flex items-center scrollbar-hidden lg:overflow-hidden'>
                                <div className='hidden lg:flex absolute left-0 w-10 h-10 rounded-full items-center justify-center bg-white shadow shadow-gray-500 cursor-pointer' onClick={() => scrollLeft(700, false, false, true)}>
                                    <FaChevronLeft />
                                </div>
                                <div ref={watchLaterDivRef} className='flex items-center overflow-x-auto scroll-smooth'>
                                    {user.watch_later.map(video => (
                                        <HorizontalScrollVideoCard 
                                            key={video._id} 
                                            videoID={video._id} 
                                            thumbnail={video.thumbnail} 
                                            title={video.title} 
                                            views={video.views} 
                                            createdAt={video.createdAt} 
                                        />
                                    ))}
                                </div>
                                <div className='hidden lg:flex absolute right-0 w-10 h-10 rounded-full items-center justify-center bg-white shadow shadow-gray-500 cursor-pointer' onClick={() => scrollRight(700, false, false, true)}>
                                    <FaChevronRight />
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <NotItem className={'w-full min-h-24 flex items-center justify-center bg-gray-200 rounded-lg text-xl uppercase text-red-600 font-bold'} text={"no videos"} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;