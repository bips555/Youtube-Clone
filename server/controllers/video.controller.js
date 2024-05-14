import { createError } from "../error.js";
import UserModel from "../models/User.model.js";
import VideoModel from "../models/Video.model.js";

export const addVideo = async (req, res, next) => {
  try {
    const newVideo = new VideoModel({ userId: req.user.id, ...req.body });
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    if (!video) {
      return next(createError(404, "Video not found."));
    }
    if (req.user.id === video.userId) {
      const updatesUser = await VideoModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json("Video has been updated.");
    } else {
      return next(createError(404, "You can update only your video."));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    if (!video) {
      return next(createError(404, "Video not found."));
    }
    if (req.user.id === video.userId) {
      const deletedVideo = await VideoModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Video successfully deleted.");
    } else {
      return next(createError(403, "You can delete only your video."));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    if (!video) {
      return next(createError(404, "Video not found."));
    } else {
      res.status(200).json(video);
    }
  } catch (err) {
    next(err);
  }
};
export const addView = async (req, res, next) => {
  try {
    await VideoModel.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).send("The view has been increased successfully.");
  } catch (err) {
    next(err);
  }
};

export const randomVideo = async (req, res, next) => {
 
  try {
    const videos = await VideoModel.aggregate([{$sample:{size:40}}])
    res.status(200).send(videos)
  } catch (err) {
    next(err);
  }
};

export const subbedVideo = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id)

        const subscribedChannels = user.subscribedUsers

    const list = await Promise.all(

        subscribedChannels.map(channelId=>{
            return VideoModel.find({userId:channelId})
        })

    )
    res.status(200).json(list)



        res.status(200).json(videos)
      } catch (err) {
        next(err);
      }
};
export const trendingVideo = async (req, res, next) => {
  const video = await VideoModel.findById(req.params.id);

  try {
    if (!video) {
      return next(createError(404, "Video not found."));
    } else {
      res.status(200).json(video);
    }
  } catch (err) {
    next(err);
  }
};
