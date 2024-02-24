import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    avatar: String,
    channelName: String,
    isUpdatedUserName: {
        type: Boolean,
        default: false
    },
    googel_id: {
        type: String,
        unique: true,
        required: true
    },
    subscribers: {
        type: Number,
        default: 0
    },
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "videos"
        }
    ],
    subscriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    liked_videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "videos"
        }
    ],
    watch_later: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "videos"
        }
    ]
}, { timestamps: true })

export const User = mongoose.model("users", userSchema)