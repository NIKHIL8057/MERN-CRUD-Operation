import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },

},{timestamps:true})

export const User = mongoose.model("User",UserSchema)