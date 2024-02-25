import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';
import { ChannelDetailsModal, HorizontalScrollVideoCard, NotItem } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannelDetails, subscribeOrUnsubscribeTheChannel } from '../../redux/action/channelAction';
import { formatValue } from '../../logics';

const UserProfile = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { channel } = useSelector(state => state.channel);
    const { user } = useSelector(state => state.user);
    const buttonRef = useRef(null);
    const [channelDetailsModalOpen, setChannelDetailsModalOpen] = useState(false);

    const isSubscribed = channel && user && user.subscriptions && user.subscriptions.find(object => object._id === channel._id)

    useEffect(() => {
        dispatch(fetchChannelDetails(params.userID));
    }, [dispatch, params.userID]);

    return (
        channel && (
            <div className='w-full h-full flex justify-center'>
                <div className='w-full lg:w-[80%] py-4'>
                    <div className='lg:max-h-64 mx-10 flex flex-col lg:flex-row items-center'>
                        <Link to={""} className='w-[200px] h-[200px] flex items-center justify-center lg:w-80 lg:h-60 rounded-full'>
                            <img src={channel.avatar} alt='profile pic' className='h-full rounded-[100%] object-cover origin-center' />
                        </Link>
                        <div className='flex flex-col justify-between w-full items-center lg:items-start my-2 lg:mx-4'>
                            <div className='uppercase text-xl lg:text-3xl font-semibold my-2'>{channel.channelName}</div>
                            <div className='text-gray-700 capitalize flex lg:block my-2'>
                                <span>{channel.username}</span>
                                <span className='mx-2'>•</span>
                                <span>{formatValue(channel.subscribers)} subscribers</span>
                                <span className='mx-2'>•</span>
                                <span>{channel.videos ? formatValue(channel.videos.length) : 0} videos</span>
                            </div>
                            {
                                isSubscribed ? (
                                    <button onClick={async () => {
                                        await dispatch(subscribeOrUnsubscribeTheChannel(channel._id))
                                        dispatch(fetchChannelDetails(params.userID))
                                    }} className='py-2 px-4 uppercase bg-green-700 rounded-[20px] text-white'>
                                        subscribed
                                    </button>
                                ) : (
                                    <button onClick={async () => {
                                        await dispatch(subscribeOrUnsubscribeTheChannel(channel._id))
                                        dispatch(fetchChannelDetails(params.userID))
                                    }} className='py-2 px-4 uppercase bg-red-700 rounded-[20px] text-white'>
                                        subscribe
                                    </button>
                                )
                            }
                            <button className='flex items-center capitalize cursor-pointer my-2' ref={buttonRef} onClick={() => setChannelDetailsModalOpen(!channelDetailsModalOpen)}>
                                more about this channel <FaChevronRight className='ml-2' />
                            </button>
                            {channelDetailsModalOpen && <ChannelDetailsModal buttonRef={buttonRef} modalOpen={channelDetailsModalOpen} setModalOpen={setChannelDetailsModalOpen} user={channel} />}
                        </div>
                    </div>
                    <hr className='my-4' />
                    <div>
                        <h1 className='text-center text-5xl underline text-black capitalize py-4 font-bold'>Videos</h1>
                        <div className='relative w-full flex items-center'>
                            {channel.videos && channel.videos.length > 0 ? (
                                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center'>
                                    {channel.videos.map((object) => (
                                        <HorizontalScrollVideoCard key={object._id} videoID={object._id} thumbnail={object.thumbnail} title={object.title} views={object.views} createdAt={object.createdAt} />
                                    ))}
                                </div>
                            ) : (
                                <NotItem className={"w-full h-48 bg-gray-200 flex items-center justify-center uppercase font-bold mt-2 rounded-lg text-red-700"} text={"no videos"} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default UserProfile;