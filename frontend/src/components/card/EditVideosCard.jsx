import React, { Fragment, useRef, useState } from 'react'
import { FaPen, FaTrashCan } from 'react-icons/fa6'
import { EditVideoModal } from "../../components"
import { useDispatch } from 'react-redux'
import { videoDelete } from '../../redux/action/userAction'
import { fetchAllVideos } from '../../redux/action/videoAction'

const EditVideosCard = ({ videoID, thumbnail, title, desc, createdAt, updatedAt }) => {

    const [editModalOpen, setEditModalOpen] = useState(false)

    const editButtonRef = useRef(null)

    const dispatch = useDispatch()

    const deleteVideoHandler = async () => {
        await dispatch(videoDelete(videoID))
        dispatch(fetchAllVideos())
    }

    return (
        <Fragment>
            <div className='w-full mt-6'>
                <div className='w-full p-2 flex flex-col lg:flex-row items-center shadow shadow-gray-700 rounded-lg'>
                    <div className='h-full w-full lg:w-[30%]'>
                        <img src={thumbnail} alt={videoID} className='w-full h-full rounded-md cursor-pointer' />
                    </div>
                    <div className='h-full w-full lg:w-[70%]'>
                        <div>
                            <h4 className='font-bold text-center uppercase'>video title</h4>
                            <p className='text-center uppercase'>{title && title.slice(0, 100) + " ..."}</p>
                        </div>
                        <div className='mt-2'>
                            <h4 className='font-bold text-center uppercase'>video description</h4>
                            <p className='text-center uppercase'>{desc && desc.slice(0, 100) + " ..."}</p>
                        </div>
                    </div>
                    <div className='h-full w-full lg:w-[20%] flex flex-row lg:flex-col items-center justify-center'>
                        <div>
                            <h4 className='font-bold text-center uppercase'>created at</h4>
                            <p className='text-center uppercase'>{createdAt && createdAt.split("T")[0]}</p>
                        </div>
                        <div className='mt-0 ml-2 lg:ml-0 lg:mt-2'>
                            <h4 className='font-bold text-center uppercase'>updated at</h4>
                            <p className='text-center uppercase'>{updatedAt && updatedAt.split("T")[0]}</p>
                        </div>
                    </div>
                    <div className='h-full w-[20%] lg:w-[12%] flex items-center justify-evenly'>
                        <div className='cursor-pointer w-10 h-10 hover:bg-gray-200 flex items-center justify-center rounded-full' onClick={()=>setEditModalOpen(!editModalOpen)} ref={editButtonRef}>
                            <FaPen color='green' title='update' />
                        </div>
                        <div onClick={deleteVideoHandler} className='cursor-pointer w-10 h-10 hover:bg-gray-200 flex items-center justify-center rounded-full'>
                            <FaTrashCan color='red' title='delete' />
                        </div>
                    </div>
                </div>
            </div>
            {
                editModalOpen && 
                <EditVideoModal editButtonRef={editButtonRef} modalOpen={editModalOpen} setModalOpen={setEditModalOpen} videoID={videoID} videoTitle={title} videoDesc={desc} />
            }
        </Fragment>
    )
}

export default EditVideosCard