import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user-model.js";
import { errorHandler } from "../util/error-handler.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) throw new errorHandler(400, "User already exists");
  if (!name || !email || !password) {
    throw new errorHandler(400, "Please fill in all fields");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  await user.save();

  const { password: pass, ...rest } = user._doc;

  res.status(201).json({
    success: true,
    message: "Thanks for registering, a verification email has been sent.",
    rest,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new errorHandler(400, "Please fill in all fields");
  }
  const user = await User.findOne({ email });
  if (!user) throw new errorHandler(400, "User not found");

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) throw new errorHandler(400, "Invalid credentials");

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  const { password: pass, ...rest } = user._doc;

  res.status(200).json({
    success: true,
    message: "You have successfully logged in!",
    rest,
  });
});
