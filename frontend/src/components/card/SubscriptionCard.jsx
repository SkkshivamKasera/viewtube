import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatValue } from '../../logics';
import { ConfirmModal } from "../../components";
import { subscribeOrUnsubscribeTheChannel } from '../../redux/action/channelAction';
import { useDispatch } from 'react-redux';

const SubscriptionCard = ({ channelID, avatar, channelName, subscribers }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const buttonRef = useRef(null);
    const dispatch = useDispatch()

    const handleFunction = async () => {
        if (channelID) {
            await dispatch(subscribeOrUnsubscribeTheChannel(channelID));
        }
    };

    return (
        <div className='mx-4 bg-gray-200 cursor-pointer p-2 rounded-lg'>
            <div className='w-40 m-1'>
                <div className='w-full flex flex-col items-center'>
                    <div className='w-20 h-20'>
                        <Link to={`/channel/user/${channelID}`} className='w-full h-full'>
                            <img src={avatar} alt='channel logo' className='w-full h-full rounded-full object-cover' />
                        </Link>
                    </div>
                    <div className='my-1'>
                        <Link to={`/channel/user/${channelID}`} className='font-semibold'>{channelName}</Link>
                    </div>
                    <div className='my-1'>
                        <Link to={`/channel/user/${channelID}`} className='text-xs capitalize font-semibold'>{formatValue(subscribers)} subscribers</Link>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <button className='px-4 py-2 capitalize bg-black text-white cursor-pointer my-1 rounded-full font-semibold' ref={buttonRef} onClick={() => setModalOpen(!modalOpen)}>subscribed</button>
                    <ConfirmModal modalOpen={modalOpen} setModalOpen={setModalOpen} buttonRef={buttonRef} message={"unsubscribe the channel"} buttonText={"unsubscribe"} handleFunction={handleFunction} />
                </div>
            </div>
        </div>
    );
};

export default SubscriptionCard;