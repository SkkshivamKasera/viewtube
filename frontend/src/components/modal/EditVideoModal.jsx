import React, { useEffect, useRef, useState } from 'react'
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { videoUpdate } from '../../redux/action/userAction'
import { fetchAllVideos } from '../../redux/action/videoAction'

const EditVideoModal = ({ editButtonRef, modalOpen, setModalOpen, videoID, videoTitle, videoDesc }) => {

  const [title, setTitle] = useState(videoTitle)
  const [desc, setDesc] = useState(videoDesc)
  const [thumbnail, setThumbnail] = useState("")
  const [loading, setLaoding] = useState(false)

  const modalRef = useRef(null)
  const dispatch = useDispatch()

  const imageChangeHandler = (event) => {
    const file = event.target.files[0]
    if(!file){
      toast.error("File not found")
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if(reader.readyState === 2){
        setThumbnail(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const updateHandler = async () => {
    setLaoding(true)
    await dispatch(videoUpdate(videoID, title, desc, thumbnail))
    await dispatch(fetchAllVideos())
    setTitle("")
    setDesc("")
    setThumbnail("")
    setLaoding(false)
    setModalOpen(false)
  }

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if(( modalRef.current || editButtonRef.current ) && !modalRef.current.contains(event.target) && !editButtonRef.current.contains(event.target)){
        setModalOpen(false)
      }
    }
    document.addEventListener("click", handleOutSideClick)
    return () => {
      document.removeEventListener("click", handleOutSideClick)
    }
  }, [modalOpen, editButtonRef, setModalOpen])

  return (
    <div className='fixed w-full h-screen bg-black bg-opacity-50 left-0 top-0 z-20 flex items-center justify-center'>
      <div ref={modalRef} className='bg-white w-4/5 px-4 rounded-lg'>
        <div>
          <div className='flex flex-col w-full mt-2'>
            <label htmlFor='update_video_title' className='font-bold text-xl cursor-pointer'>Video Title</label>
            <input id='update_video_title' type='text' placeholder='Enter Video Title' value={title} onChange={(e) => setTitle(e.target.value)} className='border border-black rounded-md w-full p-2 flex items-center' />
          </div>
          <div className='flex flex-col w-full mt-2'>
            <label htmlFor='update_video_desc' className='font-bold text-xl cursor-pointer'>Video Description</label>
            <textarea id="update_video_desc" cols="30" rows="10" className='resize-none border border-black rounded-md w-full p-2 flex items-center' value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div className='flex flex-col w-full mt-2'>
            <label htmlFor='update_video_thumbnail' className='font-bold text-xl cursor-pointer'>Choose Video Thumbnail</label>
            <input type='file' accept='image/*' onChange={imageChangeHandler} id='update_video_thumbnail' className='border border-black rounded-md w-full p-2 flex items-center' />
          </div>
          <div className='w-full flex items-center'>
            <button onClick={()=>setModalOpen(false)} className='my-4 w-full uppercase bg-red-700 text-white rounded-lg py-3 cursor-pointer'>cancle</button>
            <button disabled={loading} className={`my-4 w-full uppercase bg-green-700 text-white rounded-lg py-3 cursor-pointer ml-2 ${loading && "bg-green-300"}`} onClick={updateHandler}>{ loading ? "updating" : "update" }</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditVideoModal