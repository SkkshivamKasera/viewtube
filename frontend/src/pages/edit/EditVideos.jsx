import React from 'react'
import { EditVideosCard } from '../../components'
import { useSelector } from 'react-redux'

const EditVideos = () => {
    const { user } = useSelector(state => state.user)
    return (
        <div className='w-screen max-w-full px-4 py-10'>
            <div className='w-full lg:w-4/5 mx-auto'>
                <div className='w-full my-4'>
                    <h1 className='text-center uppercase text-2xl text-black underline w-full'>update videos</h1>
                    {
                        user && user.videos && user.videos.map((video) => (
                            <EditVideosCard
                                videoID={video._id}
                                thumbnail={video.thumbnail}
                                title={video.title}
                                desc={video.desc}
                                createdAt={video.createdAt}
                                updatedAt={video.updatedAt}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default EditVideos