export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const stack = err.stack || "No stack trace available";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    stack: process.env.NODE_ENV === "production" ? null : stack,
    message,
  });
};
