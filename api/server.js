import express from "express";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/error.js";
import authRoutes from "./routes/auth-routes.js";
import userRoutes from "./routes/user-routes.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
