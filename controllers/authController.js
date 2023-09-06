const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const db = require('../utils/database');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.user_id);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, phone, password, password_confirm, gender, address } = req.body;
  if (!email || !password || !name || !password_confirm || !phone || !gender) {
    return next(new AppError('Please fill in all detail!', 400));
  }

  const newUser = await db.users.create({
    name,
    email,
    password,
    password_confirm,
    phone,
    gender,
    address
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
  const user = await db.users.findOne({ where: { email } });

  if (!user) {
    return next(new AppError('Incorrect email', 400));
  }

  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect password', 400));
  }

  // If everything is ok, send token to client
  createSendToken(user, 201, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token from headers and check it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // else if (req.cookies.jwt) {
  //   token = req.cookies.jwt;
  // }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await db.users.findByPk(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('This token belonging to the user does no longer exist', 401)
    );
  }

  // 4) Check if the user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password. Please log in again!', 401)
    );
  }

  // GRANT ACCESS to protected routes
  // req.user = currentUser;
  // res.locals.user = currentUser;
  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await db.users.findByPk(+req.params.user_id);

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password)))
    return next(new AppError('Your current password is incorrect', 401));

  // 3) If so, update password
  user.password = req.body.newPassword;
  user.password_confirm = req.body.newPasswordConfirm;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
});
