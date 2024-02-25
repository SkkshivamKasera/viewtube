import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatValue, timeDifference } from '../../logics';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { OptionList } from '../../components';

const VideoCard = ({
    videoID,
    channelID,
    thumbnail,
    channel_logo,
    title,
    channel_name,
    views, 
    createdAt
}) => {
    const [activeOptionList, setActiveOptionList] = useState(false);

    const optionOpenRef = useRef(null);

    useEffect(() => {
        const handleOutSideClick = (event) => {
            if (optionOpenRef.current && !optionOpenRef.current.contains(event.target)) {
                setActiveOptionList(false);
            }
        };
        document.addEventListener('click', handleOutSideClick);
        return () => {
            document.removeEventListener('click', handleOutSideClick);
        };
    }, [activeOptionList]);

    return (
        <div className='w-[90%] h-96 shadow-lg rounded-sm cursor-pointer mt-3'>
            <div className='w-full h-60'>
                <Link to={`/video/watch/${videoID}`} className='w-full h-full'>
                    <img src={thumbnail} alt={`${videoID}`} className='w-full h-full rounded-sm object-cover' />
                </Link>
            </div>
            <div className='flex mt-2 px-1'>
                <div className='h-full'>
                    <Link to={`/channel/user/${channelID}`} className='block w-10 h-10'>
                        <img src={channel_logo} alt={`${channelID}`} className='w-full h-full rounded-full object-cover' />
                    </Link>
                </div>
                <div className='flex flex-col w-full px-2'>
                    <Link to={`/video/watch/${videoID}`} className='flex w-full text-justify'>{title.length > 100 ? title.slice(0, 68) : title}</Link>
                    <Link to={`/channel/user/${channelID}`} className='mt-2 text-gray-600'>{channel_name}</Link>
                    <Link to={`/video/watch/${videoID}`} className='mt-2 text-gray-600'>
                        {formatValue(views)}
                        <span className='ml-1'>views</span>
                        <span className='ml-2 mr-2'>•</span>
                        {timeDifference(createdAt)}
                    </Link>
                </div>
                <div className='h-full relative'>
                    <div className='flex w-10 h-10 cursor-pointer items-center justify-center rounded-full active:bg-gray-200' ref={optionOpenRef} onClick={() => setActiveOptionList(!activeOptionList)}>
                        <FaEllipsisVertical />
                    </div>
                    {
                        activeOptionList &&
                        <OptionList className='-left-[290px] top-2' videoID={videoID} />
                    }
                </div>
            </div>
        </div>
    );
};

export default VideoCard;