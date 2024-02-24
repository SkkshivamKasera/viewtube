import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CommentInput, CommentShowOnMobile } from '../../components'

const MobileCommentsShow = () => {
    const navigate = useNavigate()

    const { video } = useSelector(state => state.videoDetails)

    return (
        <Fragment>
            {
                (video && video.comments && video.comments.length > 0) ? (
                    <div className='w-full flex flex-col items-center lg:hidden'>
                        <h1 className="text-xl p-4 text-center bg-gray-200 rounded-sm">Comments on : "{video.title}"</h1>
                        {
                            video.comments.map((comment) => (
                                <CommentShowOnMobile
                                    key={comment._id}
                                    videoID={video._id}
                                    commentID={comment._id}
                                    userID={comment.user && comment.user._d}
                                    avatar={comment.user && comment.user.avatar}
                                    username={comment.user && comment.user.username}
                                    createdAt={comment.createdAt}
                                    commentText={comment.comment}
                                    likes={comment.likes}
                                    replies={comment.replies}
                                />
                            ))
                        }
                        <div className='fixed bottom-0 w-full bg-white shadow-2xl shadow-black py-3 px-2'>
                            <CommentInput
                                videoID={video._id}
                                commentTo={"VIDEO"}
                            />
                        </div>
                    </div>
                ) : (
                    <Fragment>
                        <div className={`w-full flex items-center justify-center text-red-700 text-xl min-h-[720px] font-bold`}>No Comments</div>
                        <div className='fixed bottom-0 w-full bg-white shadow-2xl shadow-black py-3 px-2'>
                            <CommentInput
                                videoID={video._id}
                                commentTo={"VIDEO"}
                            />
                        </div>
                    </Fragment>
                )
            }
            <div className='hidden lg:flex flex-col items-center justify-center w-[100%] text-red-600 font-extrabold uppercase text-5xl mt-28'>
                This route is only for mobiles
                <button onClick={() => navigate(-1)} className='bg-red-700 px-4 py-2 uppercase mt-4 text-2xl rounded-lg text-white'>go back</button>
            </div>
        </Fragment>
    )
}

export default MobileCommentsShow
