import mongoose from "mongoose"

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        reference:"UserData",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})

export const task = new mongoose.model("Task",schema)