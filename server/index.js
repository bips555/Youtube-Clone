import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"

dotenv.config()

const app = express()

const connect =()=>{
    mongoose.connect(process.env.MONGO_URL) .then(()=>{
        console.log("Connected to Database.")
    }).catch((err)=>{throw err})
} 

app.listen(3000,()=>
{
    connect()
    console.log("Server is running at port 3000")
})
