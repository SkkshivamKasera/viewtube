import express, { urlencoded } from "express"
import dotenv from "dotenv"
import { database_connection } from "./config/database.js"
import { connectPassport } from "./utils.js"
import cors from 'cors'
import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import { Router } from "./router.js"
import { v2 as cloudinary } from "cloudinary"
import path from "path"

dotenv.config({ path: "./backend/config/config.env" })

const app = express()
database_connection()
connectPassport()

cloudinary.config({
    cloud_name: process.env.CLOUDINART_DATABASE,
    api_key: process.env.CLOUDINART_API_KEY,
    api_secret: process.env.CLOUDINART_API_SECRET
});

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser("qwertyuiop"))
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none"
    }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/api/v1", Router)

// -------------DEPLOYMENT----------------//

const dirName = path.resolve()
if(process.env.NODE_ENV === "PRODUCTION"){
    app.use(express.static(path.join(dirName, "/frontend/build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirName, "frontend", "build", "index.html"))
    })
}else{
    app.get("/", (req, res) => {
        res.send("Api is running")
    })
}

// -------------DEPLOYMENT----------------//

app.listen(process.env.PORT, () => {
    console.log(`Server is running on : http://localhost:${process.env.PORT}`)
})