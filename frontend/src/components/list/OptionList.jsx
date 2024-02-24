import React from 'react';
import { MdOutlineOutlinedFlag, MdOutlineWatchLater } from 'react-icons/md';
import { TfiDownload } from 'react-icons/tfi';
import { PiShareFatLight } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWatchLater, saveToWatchLater } from '../../redux/action/videoAction';

const OptionList = ({ className, videoID }) => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleAddToWatchLater = () => {
    dispatch(saveToWatchLater(videoID));
  };

  const handleRemoveFromWatchLater = () => {
    dispatch(removeFromWatchLater(videoID));
  };

  return (
    user && (
      <ul className={`absolute ${className} bg-white z-10 w-72 p-2 rounded-lg shadow shadow-gray-500`}>
        <li
          className='flex items-center px-2 py-1 hover:bg-gray-200 rounded-md cursor-pointer w-full'
          onClick={user.watch_later && user.watch_later.find(object => object._id === videoID) ? handleRemoveFromWatchLater : handleAddToWatchLater}
        >
          <MdOutlineWatchLater />
          <span className='ml-2 capitalize'>
            {user.watch_later && user.watch_later.find(object => object._id === videoID) ? 'remove from watch later' : 'add to watch later'}
          </span>
        </li>
        <li className='flex items-center px-2 py-1 hover:bg-gray-200 rounded-md cursor-pointer w-full'>
          <TfiDownload />
          <span className='ml-2 capitalize'>download</span>
        </li>
        <li className='flex items-center px-2 py-1 hover:bg-gray-200 rounded-md cursor-pointer w-full'>
          <PiShareFatLight />
          <span className='ml-2 capitalize'>share</span>
        </li>
        <li className='flex items-center px-2 py-1 hover:bg-gray-200 rounded-md cursor-pointer w-full'>
          <MdOutlineOutlinedFlag />
          <span className='ml-2 capitalize'>report</span>
        </li>
      </ul>
    )
  );
};

export default OptionList;