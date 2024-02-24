import { User } from "../models/UserModel.js";
import { Video } from "../models/VideoModel.js";
import { sendError } from "../utils.js";

export const search = async (req, res) => {
    try {
        const { searchQuery } = req.params;
        console.log(searchQuery)
        let videos = await Video.find({
            title: { $regex: searchQuery, $options: 'i' }
        });
        let channels = await User.find({
            $or: [
                { channelName: { $regex: searchQuery, $options: 'i' } },
                { username: { $regex: searchQuery, $options: 'i' } },
            ]
        })
        videos = await Video.populate(videos, { path: "user likes comments" });
        return res.status(200).json({ success: true, videos, channels, length: videos.length, lengthC: channels.length });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
}