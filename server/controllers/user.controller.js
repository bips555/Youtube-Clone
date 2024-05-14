import { createError } from "../error.js";
import UserModel from "../models/User.model.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).send("User has been updated successfully.");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can only update your account."));
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
      if(deletedUser){
      res.status(200).send("User has been deleted successfully.");
      }
      else{
        next(createError(404,"User not found."))
      }
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can delete your account."));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return next(createError(404, "User not found"));
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    next(err);
  }
};
export const subscribe = async (req, res, next) => {
  try {
    await UserModel.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await UserModel.findByIdAndUpdate(req.params.id,{
      $inc:{subscribers:1}
    })

    res.status(200).json("Subscription is successfull.")
  } catch (err) {
    next(err);
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    await UserModel.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await UserModel.findByIdAndUpdate(req.params.id,{
      $inc:{subscribers: -1}
    })

    res.status(200).json("UnSubscription is successfull.")
  } catch (err) {
    next(err);
  }
};
export const like = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
export const dislike = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
