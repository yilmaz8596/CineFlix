import asyncHandler from "express-async-handler";

export const signout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Successfully signed out" });
});
