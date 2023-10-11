exports.errorMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultErr = {
    statusCode: err.status || 404,
    success: err.success || "failed",
    message: err.message || "Error",
  };

  if (err?.name === "ValidationError") {
    defaultErr.statusCode = 404;
    defaultErr.message = Object.values(err, errors)
      .map((el) => el.message)
      .join(",");
  }

  res.status(defaultErr.statusCode).json({
    success: defaultErr.success,
    message: defaultErr.message,
  });
};
