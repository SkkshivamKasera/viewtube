import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { PiShareFatLight } from 'react-icons/pi';
import { TfiDownload } from 'react-icons/tfi';
import { FiMoreHorizontal } from 'react-icons/fi';
import { CommentInput, CommentShow, ConfirmModal, OptionList, VideoCard } from '../../components';
import { formatValue, timeDifference } from '../../logics';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoDetails, likeToVideo, updateView } from '../../redux/action/videoAction';
import { subscribeOrUnsubscribeTheChannel } from '../../redux/action/channelAction';

const WatchVideo = ({ loadVideoDetails, setLoadVideoDetails }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isView, setIsView] = useState(false)

  const { video } = useSelector(state => state.videoDetails);
  const { user } = useSelector(state => state.user);

  const [activeOptionList, setActiveOptionList] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const subscribedButtonRef = useRef(null);
  const optionOpenRef = useRef(null);

  const isLiked = video && user && video.likes && video.likes.find(object => object._id === user._id);

  const isSubscribed = video && video.user && user && user.subscriptions && user.subscriptions.find(object => object._id === video.user._id)

  const handleFunction = async () => {
    if (video && video.user) {
      await dispatch(subscribeOrUnsubscribeTheChannel(video.user._id));
      setIsSubscribing(!isSubscribing)
    }
  };

  const like = () => {
    if (video) {
      dispatch(likeToVideo(params.videoID));
    }
  };

  useEffect(() => {
    if (isSubscribing) {
      dispatch(fetchVideoDetails(params.videoID));
      setIsSubscribing(false)
    }
    if (!loadVideoDetails) {
      dispatch(fetchVideoDetails(params.videoID))
    }
  }, [dispatch, params.videoID, video, isSubscribing, loadVideoDetails]);

  useEffect(() => {
    const handleOutSideClick = event => {
      if (optionOpenRef.current && !optionOpenRef.current.contains(event.target)) {
        setActiveOptionList(false);
      }
    };
    document.addEventListener('click', handleOutSideClick);
    return () => {
      document.removeEventListener('click', handleOutSideClick);
    };
  }, [activeOptionList]);

  const viewIncreaseHandler = () => {
    if(!isView){
      if(video){
        dispatch(updateView(video._id))
        setIsView(true)
      }
    }
  }

  return (
    video && (
      <div className='w-full lg:flex lg:px-10 lg:py-2'>
        <div className='w-full lg:w-3/4'>
          <div className='w-full bg-black rounded-md'>
            <video onPlay={viewIncreaseHandler}  controls className='w-full h-full rounded-md'>
              <source src={video.video} type='video/mp4' />
            </video>
          </div>
          <div className='px-2'>
            <p className='text-justify text-gray-950 font-semibold'>
              {window.innerWidth > 800 ? (video.title.length >= 100 ? video.title.slice(0, 281) + ' ...' : video.title) : video.title.length >= 100 ? video.title.slice(0, 95) + ' ...' : video.title}
            </p>
            <div className='lg:flex lg:items-center lg:justify-between'>
              <div className='flex items-center justify-between w-full lg:w-[400px]'>
                <div className='flex items-center'>
                  <Link to={`/channel/user/${video.user && video.user._id}`} className='flex items-center'>
                    <div className='w-20 h-20 rounded-full p-2'>
                      <img src={video.user && video.user.avatar} alt={`${video.user && video.user._id}`} className='w-full h-full rounded-full' />
                    </div>
                    <div>
                      <p className='capitalize font-bold'>{video.user && video.user.channelName}</p>
                      <p className='capitalize'>{video.user && formatValue(video.user.subscribers)} subscribers</p>
                    </div>
                  </Link>
                </div>
                <div className='ml-4'>
                  {isSubscribed ? (
                    <button className='px-4 py-2 uppercase bg-green-600 cursor-pointer rounded-3xl text-white font-semibold' onClick={() => setConfirmModalOpen(!confirmModalOpen)} ref={subscribedButtonRef}>
                      subscribed
                    </button>
                  ) : (
                    <button className='px-4 py-2 uppercase bg-red-600 cursor-pointer rounded-3xl text-white font-semibold' onClick={handleFunction}>
                      subscribe
                    </button>
                  )}
                  {confirmModalOpen && <ConfirmModal modalOpen={confirmModalOpen} setModalOpen={setConfirmModalOpen} buttonRef={subscribedButtonRef} message={'unsubscribe the channel'} buttonText={'unsubscribe'} handleFunction={handleFunction} setIsSubscribing={setIsSubscribing} />}
                </div>
              </div>
              <div className='flex items-center justify-between w-full lg:w-auto lg:ml-10 relative'>
                <div className='flex items-center px-4 py-2 rounded-3xl bg-gray-200 lg:mr-10 hover:bg-gray-600 hover:text-white font-semibold cursor-pointer' onClick={like}>
                  {isLiked ? <BiSolidLike /> : <BiLike />}
                  <span className='ml-2'>{video.likes && formatValue(video.likes.length)}</span>
                </div>
                <div className='flex items-center px-4 py-2 rounded-3xl bg-gray-200 lg:mr-10 hover:bg-gray-600 hover:text-white font-semibold cursor-pointer'>
                  <PiShareFatLight />
                  <span className='ml-2'>share</span>
                </div>
                <div className='flex items-center px-4 py-2 rounded-3xl bg-gray-200 lg:mr-10 hover:bg-gray-600 hover:text-white font-semibold cursor-pointer'>
                  <TfiDownload />
                  <span className='ml-2'>download</span>
                </div>
                <div className='flex items-center px-4 py-2 rounded-3xl bg-gray-200 hover:bg-gray-600 hover:text-white font-semibold cursor-pointer' ref={optionOpenRef} onClick={() => setActiveOptionList(!activeOptionList)}>
                  <FiMoreHorizontal />
                </div>
                {activeOptionList && <OptionList className={'right-14 top-3'} videoID={video._id} />}
              </div>
            </div>
            <div className='w-full bg-gray-200 mt-2 rounded-3xl'>
              <p className='flex items-center p-4'>
                <span className='font-bold capitalize'>{formatValue(video.views)} views</span>
                <span className='ml-3 capitalize font-bold'>{timeDifference(video.createdAt)}</span>
              </p>
              <p className='px-4 text-justify text-xs lg:text-[16px] leading-5'>
                {window.innerWidth > 800 ? (!showFullDesc ? video.desc.slice(0, 270) : video.desc) : !showFullDesc ? video.desc.slice(0, 113) : video.desc}
                {!showFullDesc ? (
                  <span onClick={() => setShowFullDesc(!showFullDesc)} className='inline-block mb-2 p-0 rounded-3xl font-bold cursor-pointer text-xl lg:text-[14px]'>
                    {' '}
                    more...
                  </span>
                ) : (
                  <span onClick={() => setShowFullDesc(!showFullDesc)} className='inline-block mb-2 p-0 rounded-3xl font-bold cursor-pointer text-xl lg:text-[14px]'>
                    {' '}
                    show less
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className='hidden lg:block px-2'>
            <h1 className='font-bold uppercase text-3xl lg:text-4xl p-2'>{video.comments && formatValue(video.comments.length)} Comments</h1>
            <div>
              <CommentInput videoID={video._id} commentTo={'VIDEO'} />
            </div>
            {video.comments && video.comments.length > 0 && (
              <div className='w-full'>
                {video.comments.map(object => (
                  <CommentShow
                    key={object._id}
                    videoID={video._id}
                    commentID={object._id}
                    userID={object.user && object.user._id}
                    avatar={object.user && object.user.avatar}
                    username={object.user && object.user.username}
                    createdAt={object.createdAt}
                    commentText={object.comment}
                    likes={object.likes}
                    replies={object.replies}
                  />
                ))}
              </div>
            )}
          </div>
          <div className='block px-2 bg-gray-200 rounded-2xl mx-2 mt-2 lg:hidden'>
            <Link to={"/comments"}>
              <p className='font-bold text-xl px-2 uppercase py-2'>
                {
                  video.comments ? formatValue(video.comments.length) : 0
                }
                {" "}comments
              </p>
              <p className='px-2 capitalize font-semibold text-blue-700'>click to see comments</p>
            </Link>
          </div>
        </div>
        <div className='px-2 mt-2 w-full'>
          {
            video.user && video.user.videos && video.user.videos.length > 0 && (
              <div className='w-full bg-gray-200 rounded-3xl py-2 flex flex-col items-center'>
                <h1 className='w-full px-4 text-3xl font-semibold text-gray-700 uppercase'>related videos</h1>
                {
                  video.user.videos.map((relatedVideo) => (
                    (video._id !== relatedVideo._id) && (
                      <VideoCard
                        key={relatedVideo._id}
                        videoID={relatedVideo._id}
                        channelID={relatedVideo.user?._id}
                        thumbnail={relatedVideo.thumbnail}
                        channel_logo={relatedVideo.user?.avatar}
                        title={relatedVideo.title}
                        channel_name={relatedVideo.user?.channelName}
                        views={relatedVideo.views}
                        createdAt={relatedVideo.createdAt}
                      />
                    )
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    )
  );
};

export default WatchVideo;