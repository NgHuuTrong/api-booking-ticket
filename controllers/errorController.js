const AppError = require('../utils/appError');

const handleDatabaseError = (err) => {
  return new AppError(err.message, 400);
};

const handleValidationErrorDB = (err) => {
  const messages = Object.values(err.errors).map((ele) => ele.message);
  const message = `Invalid input data: ${messages.join('; ')}`;
  return new AppError(message, 400);
};

const handleJWTInvalidTokenError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredToken = () =>
  new AppError('Your token has expired. Please log in again!', 401);

const sendErrorDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  res.status(500).json({
    status: 'error',
    message: 'Something went very wrong',
  });
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    console.log(error.message);
    if (err.name === 'SequelizeDatabaseError')
      error = handleDatabaseError(error); // Database Errors
    if (err.name === 'SequelizeValidationError')
      error = handleValidationErrorDB(error); // Validation Errors

    if (err.name === 'JsonWebTokenError') error = handleJWTInvalidTokenError(); // JWT Invalid Token Error
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredToken(); // JWT Expired Token

    sendErrorProd(error, res);
  }
};
