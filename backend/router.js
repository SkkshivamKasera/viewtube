import express from "express"
import passport from "passport"
import dotenv from 'dotenv'
import { sendError } from "./utils.js"
import jwt from "jsonwebtoken"
import { isAuthentication } from "./middleware.js"
import { fetchChannelDetails, myChannel, myChannelUpdate, subscribe } from "./actions/userAction.js"
import { addToWatchLater, createVideo, fetchAllVideos, fetchMyVideos, fetchVideoDetails, like, removeFromWatchLater, updateView, videoDelete, videoDownload, videoUpdate } from "./actions/videoAction.js"
import { addComment, likeToCommet, likeToReplyedCommet, replyToComment, replyToReplyedComment } from "./actions/commentAction.js"
import { search } from "./actions/searchAction.js"

dotenv.config({ path: "./backend/config/config.env" })

export const Router = express.Router()

Router.route("/google_login").get(passport.authenticate("google", {
    scope: ["profile", "email"]
}))

Router.route("/login").get((req, res, next) => {
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })(req, res, next);
}, async (req, res) => {
    try{
        const token = await jwt.sign({ id: req.user?._id }, process.env.JWT_SECRET)
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000
        })
        res.redirect(process.env.FRONTEND_URL);
    }catch(error){
        return sendError(res, 500, error.message)
    }
})

//channels
Router.route("/channel/me").get(isAuthentication, myChannel)
Router.route("/channel/:channelID/subscribe").get(isAuthentication, subscribe)
Router.route("/channel/:channelID/details").get(fetchChannelDetails)
Router.route("/channel/me/update").put(isAuthentication, myChannelUpdate)

//search
Router.route("/search/:searchQuery").get(search)

//videos
Router.route("/video/create").post(isAuthentication, createVideo)
Router.route("/video/fetch/all").get(fetchAllVideos)
Router.route("/video/fetch/my").get(isAuthentication, fetchMyVideos)

Router.route("/video/:videoID/fetch/details").get(fetchVideoDetails)
Router.route("/video/:videoID/set/view").get(updateView)

Router.route("/video/:videoID/like").get(isAuthentication, like)
Router.route("/video/:videoID/watch/later/add").get(isAuthentication, addToWatchLater)
Router.route("/video/:videoID/watch/later/remove").get(isAuthentication, removeFromWatchLater)

Router.route("/video/:videoID/download").get(videoDownload)

Router.route("/video/:videoID/comment/add").post(isAuthentication, addComment)
Router.route("/video/comment/:commentID/reply").post(isAuthentication, replyToComment)
Router.route("/video/comment/:commentID/replyed/:replyedCommentID/reply").post(isAuthentication, replyToReplyedComment)
Router.route("/video/:videoID/comment/:commentID/like").get(isAuthentication, likeToCommet)
Router.route("/video/:videoID/comment/:commentID/reply/:replyedCommentID/like").get(isAuthentication, likeToReplyedCommet)

Router.route("/video/:videoID/update").put(isAuthentication, videoUpdate)
Router.route("/video/:videoID/delete").delete(isAuthentication, videoDelete)