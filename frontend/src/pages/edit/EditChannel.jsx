import React, { useState } from 'react'
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { myChannelUpdate } from '../../redux/action/channelAction'

const EditChannelAndVideos = () => {

  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)

  const [channelName, setChannelName] = useState("")
  const [userName, setUserName] = useState("")
  const [avatar, setAvatar] = useState("")
  const [loading, setLoading] = useState(false)

  const imageChangeHandler = (event) => {
    const image = event.target.files[0]
    if (!image) {
      toast.error("file not choose")
      return;
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result)
      }
    }
    reader.readAsDataURL(image)
  }

  const updateHandler = async () => {
    setLoading(true)
    await dispatch(myChannelUpdate(channelName, userName, avatar))
    setChannelName("")
    setAvatar("")
    setUserName("")
    setLoading(false)
  }

  return (
    <div className='w-screen max-w-full px-4 py-10'>
      <div className='w-full lg:w-4/5 mx-auto'>
        <div className='w-full my-4'>
          <h1 className='text-center uppercase text-2xl text-black underline w-full'>update channel</h1>
          <div className='py-2 px-2 mt-4'>
            <div className='flex flex-col w-full'>
              <label htmlFor='update_channel_name' className='w-full text-xl uppercase cursor-pointer'>channel name</label>
              <input id='update_channel_name' type='text' placeholder='Enter Channel Name' className='w-full border border-black p-2 rounded-md flex items-center' value={channelName} onChange={(e) => setChannelName(e.target.value)} />
            </div>
            {
              user && !user.isUpdatedUserName && (
                <div className='flex flex-col w-full'>
                  <label htmlFor='update_user_name' className='w-full text-xl uppercase cursor-pointer mt-4'>user name for channel</label>
                  <input id='update_user_name' type='text' placeholder='Enter User Name' className='w-full border border-black p-2 rounded-md flex items-center' value={userName} onChange={(e) => setUserName(e.target.value)} />
                  <p className='text-red-600'>Warning: This action can only be performed once.</p>
                </div>
              )
            }
            <div className='flex flex-col w-full'>
              <label htmlFor='update_avatar' className='w-full text-xl uppercase cursor-pointer mt-4'>user name for channel</label>
              <input id='update_avatar' type='file' accept='image/*' className='w-full border border-black p-2 rounded-md flex items-center' onChange={imageChangeHandler} />
            </div>
            <button disabled={loading} className='mt-10 w-full bg-green-700 text-white text-xl uppercase cursor-pointer rounded-full p-2' onClick={updateHandler}>{loading ? "updating" : "update"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditChannelAndVideos
