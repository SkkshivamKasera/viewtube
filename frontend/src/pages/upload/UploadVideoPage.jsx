import React, { useState } from 'react'
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { createVideo } from "../../redux/action/videoAction"

const UploadVideoPage = ({ fetchAll, setFetchAll }) => {

  const [video, setVideo] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const uploadVideo = async () => {
    setLoading(true)
    try{
      const videoData = new FormData()
      videoData.append("file", video)
      videoData.append("upload_preset", "myCloud")
      videoData.append("cloud_name", "dqbnv6dow")
      videoData.append("folder", "viewtubevideos")

      const thumbnailData = new FormData()
      thumbnailData.append("file", thumbnail)
      thumbnailData.append("upload_preset", "myCloud")
      thumbnailData.append("cloud_name", "dqbnv6dow")
      thumbnailData.append("folder", "viewtubeimg")

      if(video === null || thumbnail === null){
        setLoading(false)
        return toast.error("please select a thumbnail or video")
      }

      const res_1 = await fetch("https://api.cloudinary.com/v1_1/dqbnv6dow/video/upload", {
        method: "POST",
        body: videoData
      })

      const res_2 = await fetch("https://api.cloudinary.com/v1_1/dqbnv6dow/image/upload", {
        method: "POST",
        body: thumbnailData
      })

      const videoResData = await res_1.json()
      const thumbnailResData = await res_2.json()

      await dispatch(createVideo(videoResData?.url, thumbnailResData?.url, title, desc))

      setFetchAll(!fetchAll)

    }catch(error){
      toast.error(error.message)
    }
    setVideo(null)
    setThumbnail(null)
    setTitle("")
    setDesc("")
    setLoading(false)
  }
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full lg:w-4/5 px-4'>
        <div className='flex flex-col w-full mt-4 lg:mt-1'>
            <label htmlFor='video' className='mt-2 cursor-pointer capitalize font-semibold'>Choose Your Video</label>
            <input id='video' type='file' accept='video/mp4' className='w-full border border-black p-2 mt-1 outline-none rounded-lg' onChange={(e)=>setVideo(e.target.files[0])} />
        </div>
        <div className='flex flex-col w-full mt-4 lg:mt-1'>
            <label htmlFor='thumbnail' className='mt-2 cursor-pointer capitalize font-semibold'>Choose Your Video Thumbnail</label>
            <input id='thumbnail' type='file' accept='image/*' className='w-full border border-black p-2 mt-1 outline-none rounded-lg' onChange={(e)=>setThumbnail(e.target.files[0])} />
        </div>
        <div className='flex flex-col w-full mt-4 lg:mt-1'>
            <label htmlFor='title' className='mt-2 cursor-pointer capitalize font-semibold'>Enter Your Video Title</label>
            <input id='title' type='text' placeholder='Enter Your Video Title' className='w-full border border-black p-2 mt-1 outline-none rounded-lg' value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div className='flex flex-col w-full mt-4 lg:mt-1'>
            <label htmlFor='desc' className='mt-2 cursor-pointer capitalize font-semibold'>Enter Your Video Description</label>
            <textarea id="desc" cols="30" rows="10" placeholder='Enter Your Video Description' className='w-full border border-black p-2 mt-1 outline-none resize-none rounded-lg' value={desc} onChange={(e)=>setDesc(e.target.value)} />
        </div>
        <button className={`w-full capitalize rounded-full p-4 mt-2 bg-black text-white transition-all delay-75 duration-75 ${loading && "bg-opacity-50"}`} disabled={loading} onClick={uploadVideo}>{!loading ? "upload video" : "uploading..."}</button>
      </div>
    </div>
  )
}

export default UploadVideoPage
