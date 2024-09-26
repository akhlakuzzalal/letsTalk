const handleError = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    status: "error",
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const handleUnknownRoutes = (req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
};

module.exports = { handleError, handleUnknownRoutes };
