const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  if (!email || !password || !name || !passwordConfirm) {
    return next(new AppError('Please fill in all detail!'));
  }

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    if (password) return next(new AppError('Please fill in email'));
    if (email) return next(new AppError('Please fill in password'));
    return next(new AppError('Please fill in email and password'));
  }

  // Check if user exists and password is correct
  const user = await User.findOne({ where: { email } }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password'), 401);
  }

  // If everything is ok, send token to client
  createSendToken(user, 201, req, res);
});
