import mongoose from "mongoose";
import UserModel from "../models/User.model.js";
import bcrypt from 'bcryptjs'
import { createError } from "../error.js";
import jwt from 'jsonwebtoken'
export const register = async (req, res,next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password,salt)
    const newUser = new UserModel({...req.body,password:hash})
   

    await newUser.save()
    res.status(200).send("User has been created.")

  } catch (error) {
    next(error)
  }
}
export const login = async (req, res,next) => {
  try {
   const user = await UserModel.findOne({name:req.body.name})
if(!user)
  {
    return next(createError(404,"User not found"))
  }

  const isCorrect = bcrypt.compareSync(req.body.password,user.password)

  if(!isCorrect)
    {
      return next(createError(400,"Wrong Credentials."))
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)

    res.cookie("access_token",token,{
      httpOnly:true
    }).status(200).json(user)

  } catch (error) {
    next(error)
  }
}
export const google = async (req, res) => {
  try {
  } catch (error) {}
}
