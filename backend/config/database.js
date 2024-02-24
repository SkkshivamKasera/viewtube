import mongoose from "mongoose";

export const database_connection = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_LOCAL_URI)
        console.log(`Database is connected to : ${conn.connection.host}`)
    }catch(error){
        console.log(error.message)
    }
}