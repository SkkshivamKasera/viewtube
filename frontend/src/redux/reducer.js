import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({  }, (builder) => {
    builder
    .addCase("GET_MY_PROFILE_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("GET_MY_PROFILE_SUCCESS", (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
    })
    .addCase("GET_MY_PROFILE_FAIL", (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload
    })
    .addCase("CHANNEL_UPDATE_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("CHANNEL_UPDATE_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.user = action.payload.user
    })
    .addCase("CHANNEL_UPDATE_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("DELETE_VIDEO_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("DELETE_VIDEO_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.user = action.payload.user
    })
    .addCase("DELETE_VIDEO_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("UPDATE_VIDEO_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("UPDATE_VIDEO_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.user = action.payload.user
    })
    .addCase("UPDATE_VIDEO_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("SUBSCRIBE_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("SUBSCRIBE_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.user = action.payload.user
    })
    .addCase("SUBSCRIBE_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("ADD_TO_WATCH_LATER_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("ADD_TO_WATCH_LATER_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.user = action.payload.user
    })
    .addCase("ADD_TO_WATCH_LATER_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("REMOVE_FROM_WATCH_LATER_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("REMOVE_FROM_WATCH_LATER_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.user = action.payload.user
    })
    .addCase("REMOVE_FROM_WATCH_LATER_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("CLEAR_ERROR", (state) => {
        state.error = null
    })
    .addCase("CLEAR_MESSAGE", (state) => {
        state.message = null
    })
})

export const videoReducer = createReducer({  }, (builder) => {
    builder
    .addCase("CREATE_VIDEO_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("CREATE_VIDEO_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload.message
    })
    .addCase("CREATE_VIDEO_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("FETCH_ALL_VIDEO_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("FETCH_ALL_VIDEO_SUCCESS", (state, action) => {
        state.loading = false
        state.videos = action.payload
    })
    .addCase("FETCH_ALL_VIDEO_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("CLEAR_ERROR", (state) => {
        state.error = null
    })
    .addCase("CLEAR_MESSAGE", (state) => {
        state.message = null
    })
})

export const videoDetailsReducer = createReducer({  }, (builder) => {
    builder
    .addCase("FETCH_VIDEO_DETAILS_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("FETCH_VIDEO_DETAILS_SUCCESS", (state, action) => {
        state.loading = false
        state.video = action.payload
    })
    .addCase("FETCH_VIDEO_DETAILS_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("LIKE_DISLIKE_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("LIKE_DISLIKE_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.video = action.payload.video
    })
    .addCase("LIKE_DISLIKE_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("SET_VIEW_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("SET_VIEW_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("SET_VIEW_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("ADD_COMMENT_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("ADD_COMMENT_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.video = action.payload.video
    })
    .addCase("ADD_COMMENT_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("LIKE_DISLIKE_COMMENT_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("LIKE_DISLIKE_COMMENT_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.video = action.payload.video
    })
    .addCase("LIKE_DISLIKE_COMMENT_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("CLEAR_ERROR", (state) => {
        state.error = null
    })
    .addCase("CLEAR_MESSAGE", (state) => {
        state.message = null
    })
})

export const channelReducer = createReducer({  }, (builder) => {
    builder
    .addCase("FETCH_CHANNEL_DETAILS_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("FETCH_CHANNEL_DETAILS_SUCCESS", (state, action) => {
        state.loading = false
        state.channel = action.payload
    })
    .addCase("FETCH_CHANNEL_DETAILS_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("CLEAR_ERROR", (state) => {
        state.error = null
    })
    .addCase("CLEAR_MESSAGE", (state) => {
        state.message = null
    })
})