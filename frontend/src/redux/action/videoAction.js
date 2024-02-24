import axios from "axios"
import { GET_CONFIG, POST_CONFIG, REQUEST_URL } from "../store"

export const createVideo = (video, thumbnail, title, desc) => async (dispatch) => {
    try{
        dispatch({ type: "CREATE_VIDEO_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/video/create`, {
            thumbnail, video, title, desc
        }, POST_CONFIG)
        dispatch({ type: "CREATE_VIDEO_SUCCESS", payload: data })
    }catch(error){
        dispatch({ type: "CREATE_VIDEO_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}

export const fetchAllVideos = () => async (dispatch) => {
    try{
        dispatch({ type: "FETCH_ALL_VIDEO_REQUEST" })
        const { data } = await axios.get(`${REQUEST_URL}/video/fetch/all`, GET_CONFIG)
        dispatch({ type: "FETCH_ALL_VIDEO_SUCCESS", payload: data.videos })
    }catch(error){
        dispatch({ type: "FETCH_ALL_VIDEO_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}

export const fetchVideoDetails = (videoID) => async (dispatch) => {
    try{
        dispatch({ type: "FETCH_VIDEO_DETAILS_REQUEST" })
        const { data } = await axios.get(`${REQUEST_URL}/video/${videoID}/fetch/details`, GET_CONFIG)
        dispatch({ type: "FETCH_VIDEO_DETAILS_SUCCESS", payload: data.video })
    }catch(error){
        dispatch({ type: "FETCH_VIDEO_DETAILS_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}

export const likeToVideo = (videoID) => async (dispatch) => {
    try{
        dispatch({ type: "LIKE_DISLIKE_REQUEST" })
        const { data } = await axios.get(`${REQUEST_URL}/video/${videoID}/like`, GET_CONFIG)
        dispatch({ type: "LIKE_DISLIKE_SUCCESS", payload: data })
    }catch(error){
        dispatch({ type: "LIKE_DISLIKE_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}

export const saveToWatchLater = (videoID) => async (dispatch) => {
    try{
        dispatch({ type: "ADD_TO_WATCH_LATER_REQUEST" })
        const { data } = await axios.get(`${REQUEST_URL}/video/${videoID}/watch/later/add`, GET_CONFIG)
        dispatch({ type: "ADD_TO_WATCH_LATER_SUCCESS", payload: data })
    }catch(error){
        dispatch({ type: "ADD_TO_WATCH_LATER_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}

export const removeFromWatchLater = (videoID) => async (dispatch) => {
    try{
        dispatch({ type: "REMOVE_FROM_WATCH_LATER_REQUEST" })
        const { data } = await axios.get(`${REQUEST_URL}/video/${videoID}/watch/later/remove`, GET_CONFIG)
        dispatch({ type: "REMOVE_FROM_WATCH_LATER_SUCCESS", payload: data })
    }catch(error){
        dispatch({ type: "REMOVE_FROM_WATCH_LATER_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}

export const updateView = (videoID) => async (dispatch) => {
    try{
        dispatch({ type: "SET_VIEW_REQUEST" })
        const { data } = await axios.get(`${REQUEST_URL}/video/${videoID}/set/view`, GET_CONFIG)
        dispatch({ type: "SET_VIEW_SUCCESS", payload: data.message })
    }catch(error){
        dispatch({ type: "SET_VIEW_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}