import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatValue, timeDifference } from '../../logics';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { FaChevronDown, FaChevronUp, FaEllipsisVertical } from 'react-icons/fa6';
import { CommentInput, CommentOptionList } from "../../components";
import { useDispatch, useSelector } from 'react-redux';
import { likeToComment, likeToReplyedCommet } from '../../redux/action/commentAction';

const CommentShow = ({
    videoID,
    commentID,
    userID,
    avatar,
    username,
    createdAt,
    commentText,
    likes,
    replies
}) => {
    const [activeOptionList, setActiveOptionList] = useState(false);
    const [activeReplyOptionList, setActiveReplyOptionList] = useState(false);
    const [openInput, setOpenInput] = useState(false);
    const [openReplyInput, setOpenReplyInput] = useState(false);
    const [repliesOpen, setIsRepliesOpen] = useState(false);

    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const optionRef = useRef(null);
    const replyOptionRef = useRef(null);

    const likeToCommentHandler = () => {
        dispatch(likeToComment(videoID, commentID))
    }

    const likeToReplyedCommentHandler = (replyedCommentID) => {
        dispatch(likeToReplyedCommet(videoID, commentID, replyedCommentID))
    }

    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (optionRef.current && !optionRef.current.contains(event.target)) {
                setActiveOptionList(false);
            }
            if (replyOptionRef.current && !replyOptionRef.current.contains(event.target)) {
                setActiveReplyOptionList(false);
            }
        };
        document.addEventListener("click", handleClickOutSide);
        return () => {
            document.removeEventListener("click", handleClickOutSide);
        };
    }, [activeOptionList, activeReplyOptionList]);

    return (
        <Fragment>
            <div className='flex justify-between w-full p-2 mt-3'>
                <div className='flex'>
                    <div className='w-10 h-10'>
                        <Link to={`/channel/user/${userID}`} className='w-full h-full rounded-full'>
                            <img src={avatar} alt={"user avatar"} className='w-full h-full rounded-full' />
                        </Link>
                    </div>
                    <div className='flex flex-col justify-between px-2'>
                        <div className='flex items-center'>
                            <Link to={`/channel/user/${userID}`}>{username}</Link>
                            <span className='ml-2'>{timeDifference(createdAt)}</span>
                        </div>
                        <div className='mt-2 text-justify'>
                            {commentText}
                        </div>
                        <div className='mt-2 flex items-center'>
                            <span className='flex items-center'>
                                {
                                    (user && likes && likes.length > 0 && likes.find((object)=>object===user._id)) ? (
                                        <BiSolidLike
                                            className='mr-2 cursor-pointer'
                                            onClick={likeToCommentHandler}
                                        />
                                    ) : (
                                        <BiLike
                                            className='mr-2 cursor-pointer'
                                            onClick={likeToCommentHandler}
                                        />
                                    )
                                }
                                {(likes && likes.length) > 0 ? formatValue(likes.length) : 0}
                            </span>
                            <button onClick={() => setOpenInput(!openInput)} className='ml-2 capitalize px-2 py-1 rounded-2xl bg-gray-200'>reply</button>
                        </div>
                        {
                            openInput &&
                            <CommentInput commentID={commentID} commentTo={"REPLY_COMMENT"} />
                        }
                        {
                            replies.length > 0 &&
                            <div className='flex items-center mt-2 cursor-pointer px-2 py-1 bg-blue-400 w-fit text-white rounded-full' onClick={() => setIsRepliesOpen(!repliesOpen)}>
                                <span className='flex items-center'>{repliesOpen ? <FaChevronUp className='mr-2' /> : <FaChevronDown className='mr-2' />} {replies?.length} Replies</span>
                            </div>
                        }
                    </div>
                </div>
                <div className='relative'>
                    <div className='w-10 h-10 hidden items-center justify-center cursor-pointer active:bg-gray-200 rounded-full' ref={optionRef} onClick={() => setActiveOptionList(!activeOptionList)}>
                        <FaEllipsisVertical />
                    </div>
                    {
                        activeOptionList &&
                        <CommentOptionList className={"-left-[180px] top-6"} />
                    }
                </div>
            </div>
            {
                (repliesOpen && replies) &&
                replies.map((reply) => (
                    <div key={reply._id} className='flex w-full ml-[5%] mt-3'>
                        <div className='flex'>
                            <div className='w-10 h-10'>
                                <Link to={`/channel/user/${reply.user && reply.user._id}`} className='w-full h-full rounded-full'>
                                    <img src={reply?.user?.avatar} alt={"user avatar"} className='w-full h-full rounded-full' />
                                </Link>
                            </div>
                            <div className='flex flex-col justify-between px-2'>
                                <div className='flex items-center'>
                                    <Link to={`/channel/user/${reply.user && reply.user._id}`}>{reply?.user?.username}</Link>
                                    <span className='ml-2'>{timeDifference(reply.createdAt)}</span>
                                </div>
                                <div className='mt-2 text-justify'>
                                    <span className='mr-2 text-gray-950 font-semibold'>{reply?.target_user?.username}</span>
                                    {reply.comment}
                                </div>
                                <div className='mt-2 flex items-center'>
                                    <span className='flex items-center'>
                                        {
                                            reply.likes && reply.likes.find((object) => object === user._id) ? (
                                                <BiSolidLike className='mr-2 cursor-pointer'
                                                    onClick={() => likeToReplyedCommentHandler(reply._id)}
                                                />
                                            ) : (
                                                <BiLike className='mr-2 cursor-pointer'
                                                    onClick={() => likeToReplyedCommentHandler(reply._id)}
                                                />
                                            )
                                        }
                                        {
                                            (reply.likes && reply.likes.length > 0) ?
                                                formatValue(reply.likes.length)
                                                : 0
                                        }
                                    </span>
                                    <button onClick={() => setOpenReplyInput(!openReplyInput)} className='ml-2 capitalize px-2 py-1 rounded-2xl bg-gray-200'>reply</button>
                                </div>
                                {
                                    openReplyInput &&
                                    <CommentInput
                                        commentID={commentID}
                                        replyedCommentID={reply._id}
                                        commentTo={"REPLYED_COMMENT"}
                                    />
                                }
                            </div>
                        </div>
                        <div className='relative'>
                            <div className='w-10 h-10 hidden items-center justify-center cursor-pointer active:bg-gray-200 rounded-full' ref={replyOptionRef} onClick={() => setActiveReplyOptionList(!activeReplyOptionList)}>
                                <FaEllipsisVertical />
                            </div>
                            {
                                activeReplyOptionList &&
                                <CommentOptionList className={"-left-[180px] top-6"} />
                            }
                        </div>
                    </div>
                ))
            }
        </Fragment>
    );
};

export default CommentShow;