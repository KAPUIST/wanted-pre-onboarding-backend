exports.errorMiddleware = (err, req, res, next) => {
  const defaultErr = {
    statusCode: err.status || 404,
    success: err.success || "failed",
    message: err.message || "Error",
  };

  if (err?.name === "SequelizeValidationError") {
    defaultErr.statusCode = 400;
    defaultErr.message = err.errors.map((el) => el.message).join(",");
  }
  if (err?.name === "SequelizeDatabaseError") {
    defaultErr.statusCode = 404;
    defaultErr.message = "SERVER_ERROR";
  }

  res.status(defaultErr.statusCode).json({
    success: defaultErr.success,
    message: defaultErr.message,
  });
};
