const AppError = require("../utils/appError");

const handleValidationError = (err) => {
  const errors = err.errors.map((el) => el.message);

  return new AppError(`invalid error Data: ${errors.join(". ")}`, 400);
};
const handleDublicateError = (err) => {
  return new AppError("duplicate Error", 400);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    dev: {
      error: err,
      stack: err.stack,
    },
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // unknown error from program

    // Log error
    console.error("errro");
    // send error
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  sendErrorDev(err, res);
};
