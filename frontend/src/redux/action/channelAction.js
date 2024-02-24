import axios from "axios"
import { GET_CONFIG, POST_CONFIG, REQUEST_URL } from "../store"

export const subscribeOrUnsubscribeTheChannel = (channelID) => async (dispatch) => {
    try{
        dispatch({ type: "SUBSCRIBE_REQUEST" })
        const { data } = await axios.get(`${REQUEST_URL}/channel/${channelID}/subscribe`, GET_CONFIG)
        dispatch({ type: "SUBSCRIBE_SUCCESS", payload: data })
    }catch(error){
        dispatch({ type: "SUBSCRIBE_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}

export const fetchChannelDetails = (channelID) => async (dispatch) => {
    try{
        dispatch({ type: "FETCH_CHANNEL_DETAILS_REQUEST" })
        const { data } = await axios.get(`${REQUEST_URL}/channel/${channelID}/details`, GET_CONFIG)
        dispatch({ type: "FETCH_CHANNEL_DETAILS_SUCCESS", payload: data.user })
    }catch(error){
        dispatch({ type: "FETCH_CHANNEL_DETAILS_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}

export const myChannelUpdate = (channelName, username, avatar) => async (dispatch) => {
    try{
        dispatch({ type: "CHANNEL_UPDATE_REQUEST" })
        const { data } = await axios.put(`${REQUEST_URL}/channel/me/update`, {
            channelName, username, avatar
        }, POST_CONFIG)
        dispatch({ type: "CHANNEL_UPDATE_SUCCESS", payload: data })
    }catch(error){
        dispatch({ type: "CHANNEL_UPDATE_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}