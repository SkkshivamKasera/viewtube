import React, { Fragment, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatValue, timeDifference } from '../../logics'
import { BiLike, BiSolidLike } from 'react-icons/bi'
import { CommentInput } from "../../components"
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { likeToComment, likeToReplyedCommet } from '../../redux/action/commentAction'
import { useDispatch } from 'react-redux'

const CommentShowOnMobile = ({
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
    const [openInput, setOpenInput] = useState(false)
    const [openRepliesInput, setOpenRepliesInput] = useState({});
    const [isRepliesOpen, setIsRepliesOpen] = useState(false)

    const dispatch = useDispatch()

    const toggleRepliesInput = (replyID) => {
        setOpenRepliesInput(prevState => ({
            ...prevState,
            [replyID]: !prevState[replyID]
        }));
    };

    const likeToCommentHandler = () => {
        dispatch(likeToComment(videoID, commentID))
    }

    const likeToReplyedCommentHandler = (replyedCommentID) => {
        dispatch(likeToReplyedCommet(videoID, commentID, replyedCommentID))
    }

    return (
        <Fragment>
            <div className='w-full flex px-4 py-5 border-b-2'>
                <div className='h-full w-10'>
                    <Link to={`/channel/user/${userID}`} className='w-4 h-4 rounded-[100%]'>
                        <img src={avatar} alt={`${userID}`} className='w-full h-full rounded-[100%]' />
                    </Link>
                </div>
                <div className='w-full flex flex-col ml-4 space-y-2'>
                    <div className=''>
                        <Link to={`/channel/user/${useId}`}>{username}</Link>
                        <span className='ml-4'>{timeDifference(createdAt)}</span>
                    </div>
                    <div className='pr-2'>
                        <p className='break-words'>
                            {commentText}
                        </p>
                    </div>
                    <div className='flex items-center'>
                        <span className='flex items-center'>
                            {
                                (likes && likes.length > 0) ? (
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
                        <span className='ml-4 uppercase text-blue-700 underline' onClick={() => setOpenInput(!openInput)}>reply</span>
                    </div>
                    {
                        openInput &&
                        <CommentInput
                            videoID={videoID}
                            commentID={commentID}
                            commentTo={"REPLY_COMMENT"}
                        />
                    }
                    {
                        replies && replies.length > 0 && (
                            <div onClick={() => setIsRepliesOpen(!isRepliesOpen)} className='flex items-center bg-blue-700 bg-opacity-50 text-white w-fit px-4 py-1 rounded-[20px]'>
                                {
                                    isRepliesOpen ?
                                        <FaChevronUp /> :
                                        <FaChevronDown />
                                }
                                <span className='ml-2'>
                                    {replies.length} replies
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>
            {
                (replies && isRepliesOpen) &&
                replies.map((replyComment) => (
                    <div key={replyComment._id} className='w-full flex px-4 bg-gray-200 py-5 border-b-2'>
                        <div className='h-full w-10'>
                            <Link to={`/channel/user/${replyComment.user && replyComment.user._id}`} className='w-4 h-4 rounded-[100%]'>
                                <img src={replyComment.user && replyComment.user.avatar} alt={`${replyComment.user && replyComment.user._id}`} className='w-full h-full rounded-[100%]' />
                            </Link>
                        </div>
                        <div className='w-full flex flex-col ml-4 space-y-2'>
                            <div className=''>
                                <Link to={`/channel/user/${replyComment.user && replyComment.user._id}`}>{replyComment.user && replyComment.user.username}</Link>
                                <span className='ml-4'>{timeDifference(replyComment.createdAt)}</span>
                            </div>
                            <div className='pr-2'>
                                <p className='break-words'>
                                    <span className='font-semibold'>{replyComment.target_user.username}</span>
                                    <span className='ml-2'>{replyComment.comment}</span>
                                </p>
                            </div>
                            <div className='flex items-center'>
                                <span className='flex items-center'>
                                    {
                                        (replyComment.likes && replyComment.likes.length > 0) ? (
                                            <BiSolidLike
                                                className='mr-2 cursor-pointer'
                                                onClick={()=>likeToReplyedCommentHandler(replyComment._id)}
                                            />
                                        ) : (
                                            <BiLike
                                                className='mr-2 cursor-pointer'
                                                onClick={()=>likeToReplyedCommentHandler(replyComment._id)}
                                            />
                                        )
                                    }
                                    {(replyComment.likes && replyComment.likes.length > 0) ? formatValue(replyComment.likes.length) : 0}
                                </span>
                                <span className='ml-4 uppercase text-blue-700 underline' onClick={() => toggleRepliesInput(replyComment._id)}>reply</span>
                            </div>
                            {
                                openRepliesInput[replyComment._id] &&
                                <CommentInput
                                    commentID={commentID}
                                    replyedCommentID={replyComment._id}
                                    commentTo={"REPLYED_COMMENT"}
                                />
                            }
                        </div>
                    </div>
                ))
            }
        </Fragment>
    )
}

export default CommentShowOnMobile