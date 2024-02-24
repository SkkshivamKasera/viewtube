import { User } from "./models/UserModel.js"
import { sendError } from "./utils.js"
import jwt from "jsonwebtoken"

export const isAuthentication = async (req, res, next) => {
    try{
        const { token } = req.cookies
        if(!token){
            return sendError(res, 404, "please login")
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decode.id)
        if(!user){
            return sendError(res, 404, "user not found")
        }
        req.user = user
        next()
    }catch(error){
        return sendError(res, 500, error.message)
    }
}