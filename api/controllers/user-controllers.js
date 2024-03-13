import asyncHandler from "express-async-handler";
import User from "../models/user-model.js";
import { errorHandler } from "../util/error-handler.js";
import bcrypt from "bcryptjs";
export const signout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Successfully signed out" });
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new errorHandler(404, "User not found");
  const { password, ...rest } = user._doc;
  res.status(200).json(rest);
});

export const updateUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({ message: "Account has been updated" });
  } else {
    throw new errorHandler(403, "You can only update your account");
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Account has been deleted" });
  } else {
    throw new errorHandler(403, "You can only delete your account");
  }
});
