import { Comment } from "../models/CommentModel.js"
import { Video } from "../models/VideoModel.js"
import { sendError } from "../utils.js"

export const addComment = async (req, res) => {
    try{
        const { videoID } = req.params
        let video = await Video.findById(videoID)
        if (!video) {
            return sendError(res, 404, "Video not found")
        }
        const user = req.user
        const { commentText } = req.body
        const comment = await Comment.create({
            comment: commentText,
            user: user._id,
        })
        await video.comments?.unshift(comment._id)
        await video.save()
        video = await video.populate("user likes comments")
        video = await video.populate("user.videos")
        video = await video.populate("comments.user")
        video = await video.populate("user.videos.user")
        video = await video.populate("comments.replies.user comments.replies.target_user")
        return res.status(200).json({ success: true, message: "comment successfully" , video})
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const replyToComment = async (req, res) => {
    try{
        const { videoID, commentID } = req.params
        console.log(videoID, commentID)
        const comment = await Comment.findById(commentID)
        let video = await Video.findById(videoID)
        if(!comment || !video){
            return sendError(res, 404, "video or comment not found")
        }
        const { commentText } = req.body
        const user = req.user
        comment.replies?.push({
            comment: commentText,
            user: user._id,
            target_user: comment.user,
            createdAt: new Date(Date.now())
        })
        await comment.save()
        video = await video.populate("user likes comments")
        video = await video.populate("user.videos")
        video = await video.populate("comments.user")
        video = await video.populate("user.videos.user")
        video = await video.populate("comments.replies.user comments.replies.target_user")
        return res.status(200).json({ success: true, message: "comment successfully", video })
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const replyToReplyedComment = async (req, res) => {
    try{
        const { videoID, commentID, replyedCommentID } = req.params
        const comment = await Comment.findById(commentID)
        let video = await Video.findById(videoID)
        if(!comment || !video){
            return sendError(res, 404, "comment not found")
        }
        const replyedComment = comment.replies?.find((replyComment) => replyComment._id?.toString() === replyedCommentID);
        if(!replyedComment){
            return sendError(res, 404, "comment not found")
        }
        const { commentText } = req.body
        const user = req.user
        comment.replies?.push({
            comment: commentText,
            user: user._id,
            target_user: replyedComment?.user,
            createdAt: new Date(Date.now())
        })
        await comment.save()
        video = await video.populate("user likes comments")
        video = await video.populate("user.videos")
        video = await video.populate("comments.user")
        video = await video.populate("user.videos.user")
        video = await video.populate("comments.replies.user comments.replies.target_user")
        return res.status(200).json({ success: true, message: "comment successfully", video })
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const likeToCommet = async (req, res) => {
    try{
        const { videoID, commentID } = req.params
        const comment = await Comment.findById(commentID)
        if(!comment){
            return sendError(res, 404, "comment not found")
        }
        const user = req.user
        let isLiked = comment.likes?.includes(user._id)
        if(!isLiked){
            comment.likes?.unshift(user._id)
            isLiked = true
        }else{
            const index = comment.likes?.indexOf(user._id)
            if(index > -1){
                comment.likes?.splice(index, 1)
            }
            isLiked = false
        }
        await comment.save()
        let video = await Video.findById(videoID)
        video = await video.populate("user likes comments")
        video = await video.populate("user.videos")
        video = await video.populate("comments.user")
        video = await video.populate("user.videos.user")
        video = await video.populate("comments.replies.user comments.replies.target_user")
        return res.status(200).json({ success: true, message: isLiked ? "like successfully" : "unlike successfully", video })
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const likeToReplyedCommet = async (req, res) => {
    try{
        const { videoID, commentID, replyedCommentID } = req.params
        const comment = await Comment.findById(commentID)
        if(!comment){
            return sendError(res, 404, "comment not found")
        }
        const replyedComment = comment.replies?.find((comment) => comment._id.toString() === replyedCommentID)
        if(!replyedComment){
            return sendError(res, 404, "comment not found")
        }
        const user = req.user
        let isLiked = replyedComment.likes?.includes(user._id)
        if(!isLiked){
            replyedComment.likes?.unshift(user._id)
            isLiked = true
        }else{
            const index = replyedComment.likes?.indexOf(user._id)
            if(index > -1){
                replyedComment.likes?.splice(index, 1)
            }
            isLiked = false
        }
        await comment.save()
        let video = await Video.findById(videoID)
        video = await video.populate("user likes comments")
        video = await video.populate("user.videos")
        video = await video.populate("comments.user")
        video = await video.populate("user.videos.user")
        video = await video.populate("comments.replies.user comments.replies.target_user")
        return res.status(200).json({ success: true, message: isLiked ? "like successfully" : "unlike successfully", video })
    }catch(error){
        return sendError(res, 500, error.message)
    }
}