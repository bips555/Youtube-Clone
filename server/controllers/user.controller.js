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
      res.status(200).send("User has been deleted successfully.");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can delete your account."));
  }
};
export const getUser = async (req, res, next) => {};
export const subscribe = async (req, res, next) => {};
export const unsubscribe = async (req, res, next) => {};
export const like = async (req, res, next) => {};
export const dislike = async (req, res, next) => {};
