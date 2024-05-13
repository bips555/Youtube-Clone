import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./routes/users.route.js";
import VideoRouter from "./routes/videos.route.js";
import CommentRouter from "./routes/comments.route.js";
import AuthRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to Database.");
    })
    .catch((err) => {
      throw err;
    });
};
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", UserRouter);
app.use("/api/videos", VideoRouter);
app.use("/api/comments", CommentRouter);
app.use("/api/auth", AuthRouter);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went Wrong.";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
app.listen(3000, () => {
  connect();
  console.log("Server is running at port 3000");
});
