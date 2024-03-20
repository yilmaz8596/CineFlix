import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user-model.js";
import { errorHandler } from "../util/error-handler.js";
import { sendVerificationEmail } from "../middleware/sendVerificationEmail.js";
import { sendPasswordResetEmail } from "../middleware/sendPasswordResetEmail.js";
export const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) throw new errorHandler(400, "User already exists");
  if (!email || !password) {
    throw new errorHandler(400, "Please fill in all fields");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  sendVerificationEmail(token, email);
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

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  const { password: pass, ...rest } = user._doc;

  res.status(200).json(rest);
});

export const googleLogin = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new errorHandler(400, "User not found");
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const { password: pass, ...rest } = user._doc;
  return res
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    .status(200)
    .json(rest);
});

export const googleRegister = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) throw new errorHandler(400, "User already exists");
  const generatedPassword =
    Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

  const hashedPassword = await bcrypt.hash(generatedPassword, 10);
  const user = new User({
    username:
      req.body.name.split(" ").join("").toLowerCase() +
      Math.random().toString(36).slice(-4),
    email: req.body.email,
    password: hashedPassword,
    avatar: req.body.photo,
  });
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const { password: pass, ...rest } = user._doc;
  res
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60),
    })
    .status(200)
    .json(rest);
});

export const verifyEmail = async (req, res, next) => {
  const token = req.params.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new errorHandler(400, "Invalid token");
    }

    user.active = true;
    await user.save();

    res
      .status(200)
      .json({ message: "Email has been verified", user: user._doc });
  } catch (error) {
    console.log(error);
    throw new errorHandler(400, "Invalid token");
  }
};

export const passwordResetRequest = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new errorHandler(400, "User not found");
  const token = jwt.sign("token", token, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  sendPasswordResetEmail(token, user.email);
  res
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    .status(200)
    .json({
      message: "A password reset link has been sent to your email",
    });
});

export const passwordReset = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ email: decoded.email });

  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    throw new errorHandler(400, "Passwords do not match");
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({ message: "Password has been reset" });
});
