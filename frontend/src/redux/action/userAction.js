import axios from "axios"
import { GET_CONFIG, POST_CONFIG, REQUEST_URL } from "../store"

export const fetchMyProfile = () => async (dispatch) => {
    try{
        dispatch({ type: "GET_MY_PROFILE_REQUEST" })
        const { data } = await axios.get(`${REQUEST_URL}/channel/me`, GET_CONFIG)
        dispatch({ type: "GET_MY_PROFILE_SUCCESS", payload: data.user })
    }catch(error){
        dispatch({ type: "GET_MY_PROFILE_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}

export const videoUpdate = (videoID, videoTitle, videoDesc, videoThumbnail) => async (dispatch) => {
    try{
        dispatch({ type: "UPDATE_VIDEO_REQUEST" })
        const { data } = await axios.put(`${REQUEST_URL}/video/${videoID}/update`, {
            videoTitle, videoDesc, videoThumbnail
        }, POST_CONFIG)
        dispatch({ type: "UPDATE_VIDEO_SUCCESS", payload: data })
    }catch(error){
        dispatch({ type: "UPDATE_VIDEO_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}

export const videoDelete = (videoID) => async (dispatch) => {
    try{
        dispatch({ type: "DELETE_VIDEO_REQUEST" })
        const { data } = await axios.delete(`${REQUEST_URL}/video/${videoID}/delete`, GET_CONFIG)
        dispatch({ type: "DELETE_VIDEO_SUCCESS", payload: data })
    }catch(error){
        dispatch({ type: "DELETE_VIDEO_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}