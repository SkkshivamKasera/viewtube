import { User } from "../models/UserModel.js";
import { sendError } from "../utils.js"
import { v2 as cloudinary } from "cloudinary"

export const extractPublicIdFromUrl = (imageUrl) => {
    const parts = imageUrl.split('/');
    const fileName = parts.pop();
    const publicId = fileName.split('.')[0];
    return publicId;
};

export const fetchChannelDetails = async (req, res) => {
    try {
        const { channelID } = req.params
        let user = await User.findById(channelID)
        user = await user.populate('videos subscriptions liked_videos watch_later');
        res.status(200).json({ sccess: true, user });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
}

export const myChannel = async (req, res) => {
    try {
        let user = req.user;
        user = await user.populate('videos subscriptions liked_videos watch_later');
        res.status(200).json({ sccess: true, user });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
}

export const subscribe = async (req, res) => {
    try {
        const { channelID } = req.params;
        let user = req.user;
        const channel = await User.findById(channelID);
        if (!channel) {
            return sendError(res, 404, "Channel not found");
        }
        let isSubscribed = user.subscriptions?.includes(channel._id);
        if (!isSubscribed) {
            channel.subscribers += 1;
            user.subscriptions.unshift(channel._id);
            isSubscribed = true
        } else {
            channel.subscribers -= 1;
            const index = user.subscriptions.indexOf(channel._id);
            if (index > -1) {
                user.subscriptions.splice(index, 1);
            }
            isSubscribed = false
        }
        await Promise.all([channel.save(), user.save()]);
        user = await user.populate('videos subscriptions liked_videos watch_later');
        return res.status(200).json({ success: true, message: isSubscribed ? "subscribe successfully" : "unsubscribe successfully", user });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

export const myChannelUpdate = async (req, res) => {
    try {
        let user = req.user
        const { channelName, username, avatar } = req.body
        if(avatar){
            const public_id = await extractPublicIdFromUrl(user.avatar)
            const { result } = await cloudinary.uploader.destroy(`viewtubeimg/${public_id}`, {
                resource_type: "image"
            })
            if(result === "not found"){
                return sendError(res, 404, "user profile is not in cloudinary")
            }
            const myCloud = await cloudinary.uploader.upload(avatar, {
                folder: "viewtubeimg"
            })
            user.avatar = myCloud.secure_url
        }
        if(channelName){
            user.channelName = channelName
        }
        if(username){
            const trimUserName = `@${username.replace(/\s+/g, '')}`
            user.username = trimUserName
            user.isUpdatedUserName = true
        }
        await user.save()
        user = await user.populate('videos subscriptions liked_videos watch_later');
        return res.status(200).json({ success: true, message: "Channel Updated Successfully", user })
    } catch (error) {
        return sendError(res, 500, error.message);
    }
}