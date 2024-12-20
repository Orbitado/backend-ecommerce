function errorHandler(error, req, res, next) {
  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.url} - ${
      error.message || "API ERROR"
    }`
  );

  const statusCode = error.statusCode || 500;
  const response = {
    message: error.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  res.status(statusCode).json(response);
}

export default errorHandler;
