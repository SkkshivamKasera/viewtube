import axios from "axios";
import { GET_CONFIG, POST_CONFIG, REQUEST_URL } from "../store";


export const addComment = (videoID, commentText) => async (dispatch) => {
    try{
        dispatch({ type: "ADD_COMMENT_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/video/${videoID}/comment/add`, {
            commentText
        }, POST_CONFIG)
        dispatch({ type: "ADD_COMMENT_SUCCESS", payload: data.message })
    }catch(error){
        dispatch({ type: "ADD_COMMENT_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}

export const replyToComment = (commentID, commentText) => async (dispatch) => {
    try{
        dispatch({ type: "ADD_COMMENT_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/video/comment/${commentID}/reply`, {
            commentText
        }, POST_CONFIG)
        dispatch({ type: "ADD_COMMENT_SUCCESS", payload: data })
    }catch(error){
        dispatch({ type: "ADD_COMMENT_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}

export const replyToReplyesComment = (commentID, replyedCommentID, commentText) => async (dispatch) => {
    try{
        dispatch({ type: "ADD_COMMENT_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/video/comment/${commentID}/replyed/${replyedCommentID}/reply`, {
            commentText
        }, POST_CONFIG)
        dispatch({ type: "ADD_COMMENT_SUCCESS", payload: data.message })
    }catch(error){
        dispatch({ type: "ADD_COMMENT_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}

export const likeToComment = (videoID, commentID) => async (dispatch) => {
    try{
        dispatch({ type: "LIKE_DISLIKE_COMMENT_REQUEST" })
        const { data } = await axios.get(`${REQUEST_URL}/video/${videoID}/comment/${commentID}/like`, GET_CONFIG)
        dispatch({ type: "LIKE_DISLIKE_COMMENT_SUCCESS", payload: data })
    }catch(error){
        dispatch({ type: "LIKE_DISLIKE_COMMENT_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}

export const likeToReplyedCommet = (videoID, commentID, replyedCommentID) => async (dispatch) => {
    try{
        dispatch({ type: "LIKE_DISLIKE_COMMENT_REQUEST" })
        const { data } = await axios.get(`${REQUEST_URL}/video/${videoID}/comment/${commentID}/reply/${replyedCommentID}/like`, GET_CONFIG)
        dispatch({ type: "LIKE_DISLIKE_COMMENT_SUCCESS", payload: data })
    }catch(error){
        dispatch({ type: "LIKE_DISLIKE_COMMENT_FAIL", payload: error.response ? error.response.data.message : error.message })
    }
}