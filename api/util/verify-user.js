import jwt from "jsonwebtoken";
import { errorHandler } from "./error-handler.js";
export const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(new errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new errorHandler(401, "Unauthorized"));
    req.user = user;
    next();
  });
};
