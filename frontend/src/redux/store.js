import { configureStore } from "@reduxjs/toolkit"
import { channelReducer, userReducer, videoDetailsReducer, videoReducer } from "./reducer"

export const store = configureStore({
    reducer: {
        user: userReducer,
        video: videoReducer,
        videoDetails: videoDetailsReducer,
        channel: channelReducer
    }
})

export const FRONTEND_URL = "https://viewtube-v001.onrender.com"
// export const FRONTEND_URL = "http://localhost:3000"
// export const FRONTEND_URL = "http://192.168.1.3:3000"

export const REQUEST_URL = "https://viewtube-v001.onrender.com/api/v1"
// export const REQUEST_URL = "http://localhost:5000/api/v1"
// export const REQUEST_URL = "http://192.168.1.3:5000/api/v1"

export const POST_CONFIG = {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
}

export const GET_CONFIG = {
    withCredentials: true
}