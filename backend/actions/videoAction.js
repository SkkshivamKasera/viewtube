import { Comment } from "../models/CommentModel.js";
import { User } from "../models/UserModel.js";
import { Video } from "../models/VideoModel.js"
import { sendError } from "../utils.js"
import { extractPublicIdFromUrl } from "./userAction.js";
import { v2 as cloudinary } from "cloudinary"

export const createVideo = async (req, res) => {
    try {
        const { thumbnail, video, title, desc } = req.body;
        if (!thumbnail || !video || !title || !desc) {
            return sendError(res, 400, "all fields are required");
        }
        const user = req.user;
        const newVideo = await Video.create({
            user: user._id,
            video,
            thumbnail,
            title,
            desc
        })
        user.videos.unshift(newVideo._id)
        await user.save()
        return res.status(201).json({ success: true, message: "video created successfully", video: newVideo })
    } catch (error) {
        return sendError(res, 500, error.message);
    }
}

export const fetchAllVideos = async (req, res) => {
    try {
        let videos = await Video.find().populate("user likes comments")
        return res.status(200).json({ success: true, videos })
    } catch (error) {
        return sendError(res, 500, error.message);
    }
}

export const fetchMyVideos = async (req, res) => {
    try {
        const user = req.user
        let videos = await Video.find({ user: user._id }).populate("user likes comments")
        return res.status(200).json({ success: true, videos })
    } catch (error) {
        return sendError(res, 500, error.message);
    }
}

export const fetchVideoDetails = async (req, res) => {
    try {
        const { videoID } = req.params
        let video = await Video.findById(videoID)
        if (!video) {
            return sendError(res, 404, "Video not found")
        }
        video = await video.populate("user likes comments")
        video = await video.populate("user.videos")
        video = await video.populate("comments.user")
        video = await video.populate("user.videos.user")
        video = await video.populate("comments.replies.user comments.replies.target_user")
        await video.save()
        return res.status(200).json({ success: true, video })
    } catch (error) {
        return sendError(res, 500, error.message);
    }
}

export const like = async (req, res) => {
    try {
        const { videoID } = req.params
        let video = await Video.findById(videoID)
        if (!video) {
            return sendError(res, 404, "Video not found")
        }
        const user = req.user
        let isLiked = video.likes?.includes(user._id)
        if (!isLiked) {
            await video.likes?.unshift(user._id)
            await user.liked_videos?.unshift(video._id)
            isLiked = true
        } else {
            const index_1 = video.likes?.indexOf(user._id)
            const index_2 = user.liked_videos?.indexOf(video._id)
            if (index_1 > -1) {
                video.likes?.splice(index_1, 1)
            }
            if (index_2 > -1) {
                user.liked_videos?.splice(index_2, 1)
            }
            isLiked = false
        }
        await Promise.all([video.save(), user.save()])
        video = await video.populate("user likes comments")
        video = await video.populate("user.videos")
        video = await video.populate("comments.user")
        video = await video.populate("user.videos.user")
        video = await video.populate("comments.replies.user comments.replies.target_user")
        return res.status(200).json({ success: true, message: isLiked ? "like successfully" : "unlike successfully", video })
    } catch (error) {
        return sendError(res, 500, error.message);
    }
}

export const addToWatchLater = async(req, res) => {
    try{
        const { videoID } = req.params
        let video = await Video.findById(videoID)
        if (!video) {
            return sendError(res, 404, "Video not found")
        }
        let user = req.user
        user.watch_later?.unshift(video._id)
        await user.save()
        user = await user.populate('videos subscriptions liked_videos watch_later');
        return res.status(200).json({ success: true, message: "successfully added in watch later", user })
    }catch(error) {
        return sendError(res, 500, error.message);
    }
}

export const removeFromWatchLater = async(req, res) => {
    try{
        const { videoID } = req.params
        let video = await Video.findById(videoID)
        if (!video) {
            return sendError(res, 404, "Video not found")
        }
        let user = req.user
        const index = await user.watch_later?.indexOf(video._id)
        if(index > -1){
            user.watch_later?.splice(index, 1)
        }
        await user.save()
        user = await user.populate('videos subscriptions liked_videos watch_later');
        return res.status(200).json({ success: true, message: "successfully removed from watch later", user })
    }catch(error) {
        return sendError(res, 500, error.message);
    }
}

export const videoDownload = async (req, res) => {
    try{
        const { videoID } = req.params
        const video = await Video.findById(videoID)
        if (!video) {
            return sendError(res, 404, "Video not found")
        }
        return res.status(200).redirect(video.video)
    }catch(error) {
        return sendError(res, 500, error.message);
    }
}

export const videoUpdate = async (req, res) => {
    try{
        const { videoID } = req.params
        let video = await Video.findById(videoID)
        let user = req.user
        if(!video){
            return sendError(res, 404, "Video not found")
        }
        const { videoTitle, videoDesc, videoThumbnail } = req.body
        if(videoThumbnail){
            const public_id = await extractPublicIdFromUrl(video.thumbnail)
            const { result } = await cloudinary.uploader.destroy(`viewtubeimg/${public_id}`, {
                resource_type: "image"
            })
            if(result === "not found"){
                return sendError(res, 404, "Thumbnail Data Not Found")
            }
            const myCloud = await cloudinary.uploader.upload(videoThumbnail, {
                folder: "viewtubeimg",
                resource_type: "image"
            })
            video.thumbnail = myCloud.secure_url
        }
        if(videoTitle){
            video.title = videoTitle
        }
        if(videoDesc){
            video.desc = videoDesc
        }
        await video.save()
        user = await User.findById(user._id)
        user = await user.populate('videos subscriptions liked_videos watch_later');
        return res.status(200).json({ success: true, message: "Vide updated successfully", user })
    }catch(error) {
        return sendError(res, 500, error.message);
    }
}

export const videoDelete = async (req, res) => {
    try{
        const { videoID } = req.params
        const video = await Video.findById(videoID)
        let user = req.user
        if (!video) {
            return sendError(res, 404, "Video not found")
        }
        const videoURL = video.video
        const videoPublicID = await extractPublicIdFromUrl(videoURL)
        let { result } = await cloudinary.uploader.destroy(`viewtubevideos/${videoPublicID}`, {
            resource_type: "video"
        })
        if(result === "not found"){
            return sendError(res, 404, "Video Data Not Found")
        }
        const thumbnailURL = video.thumbnail
        const thumbnailPublicID = await extractPublicIdFromUrl(thumbnailURL)
        result = await cloudinary.uploader.destroy(`viewtubeimg/${thumbnailPublicID}`, {
            resource_type: "image"
        })
        if(result.result === "not found"){
            return sendError(res, 404, "Image Data Not Found")
        }
        const commentIDs = video.comments.map(comment => comment._id);
        await Comment.deleteMany({ _id: { $in: commentIDs } });
        await User.updateOne({ videos: video._id }, { $pull: { videos: video._id } });
        await User.updateOne({ watch_later: video._id }, { $pull: { watch_later: video._id } });
        await Video.deleteOne({ _id: videoID });
        user = await User.findById(user._id)
        user = await user.populate('videos subscriptions liked_videos watch_later');
        return res.status(200).json({ success: true, message: "video deleted successfully", user })
    }catch(error) {
        return sendError(res, 500, error.message);
    }
}

export const updateView = async (req, res) => {
    try{
        const { videoID } = req.params
        const video = await Video.findById(videoID)
        if (!video) {
            return sendError(res, 404, "Video not found")
        }
        video.views += 1
        await video.save()
        return res.status(200).json({ success: true, message: "Playing" })
    }catch(error) {
        return sendError(res, 500, error.message);
    }
}