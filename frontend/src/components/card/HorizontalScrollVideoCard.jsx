import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { formatValue, timeDifference } from '../../logics';
import { OptionList } from "../../components";

const HorizontalScrollVideoCard = ({ videoID, thumbnail, title, views, createdAt }) => {
    const [activeOptionsList, setActiveOptionsList] = useState(false);
    const optionOpenRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionOpenRef.current && !optionOpenRef.current.contains(event.target)) {
                setActiveOptionsList(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [activeOptionsList]);

    return (
        <div className='mx-4'>
            <div>
                <div className='w-80 h-40'>
                    <Link to={`/video/watch/${videoID}`} className='w-full h-full'>
                        <img src={thumbnail} alt='video thumbnail' className='w-full h-full rounded-md origin-center object-cover'/>
                    </Link>
                </div>
                <div className='w-full flex justify-between mt-2'>
                    <Link to={`/video/watch/${videoID}`}>
                        <p className='text-justify'>{title?.length >= 40 ? title.slice(0, 35) + " ..." : title}</p>
                        <p className='text-gray-500 text-xs capitalize'>{formatValue(views)} views<span className='mx-2'>•</span>{timeDifference(createdAt)}</p>
                    </Link>
                    <div className='relative'>
                        <div className='w-10 h-10 flex items-center justify-center cursor-pointer active:bg-gray-200 rounded-full' ref={optionOpenRef} onClick={() => setActiveOptionsList(!activeOptionsList)}>
                            <FaEllipsisVertical />
                        </div>
                        {activeOptionsList && <OptionList className={"-top-[130px] -left-[270px]"} videoID={videoID} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HorizontalScrollVideoCard;