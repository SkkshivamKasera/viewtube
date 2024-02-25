import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    replies: [
        {
            comment: String,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            },
            target_user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            },
            likes: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users"
                }
            ],
            createdAt: Date
        }
    ]

}, { timestamps: true })

export const Comment = mongoose.model("comments", commentSchema)