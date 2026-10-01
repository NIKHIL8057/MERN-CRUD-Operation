import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB)
        console.log(`MongoDB is connected ${conn}`);
    } catch {
        console.log(error)
    }
}