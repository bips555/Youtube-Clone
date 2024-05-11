import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({

userId:{
    type:String,
    required:true
},
title:{
    type:String,
    required:true
},
imgUrl:{
    type:String,
    required:true,
},
img:{
    type:String
},
videoUrl:{
    type:String,
    required:true
},
views:{
    type:Number,
    default:0
},
tags:{
    type:[String],
    default:[]
},
likes:{
    type:[String],
    default:[]
},
dislikes:{
    type:[String],
    default:[]
}


},{timestamps:true})

const VideoModel = mongoose.model("Video",VideoSchema)
export default VideoModel