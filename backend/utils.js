import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { User } from "./models/UserModel.js"
import { v2 as cloudinary } from "cloudinary"

export const sendError = (res, statusCode, message) => {
    return res.status(statusCode).json({ success: false, message })
}

export const connectPassport = async () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ['profile', 'email']
    }, async function(accessToken, refreshToken, profile, done){
        const user = await User.findOne({ googel_id: profile.id })
        if(!user){
            const myCloud = await cloudinary.uploader.upload(profile.photos[0].value, {
                folder: "viewtubeimg"
            })
            const newUser = await User.create({
                name: profile.displayName,
                username: `@${profile.displayName.replace(/\s+/g, '')}`,
                channelName: `${profile.displayName.replace(/\s+/g, '')}`,
                googel_id: profile.id,
                email: profile.emails[0].value,
                avatar: myCloud.secure_url
            })

            return done(null, newUser)
        }else{
            return done(null, user)
        }
    }))
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)
        done(null, user)
    })
}