const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const db = require('../utils/database');
const Email = require('../utils/email');

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
  const { name, email, phone, password, password_confirm, gender, address } =
    req.body;
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
    address,
  });

  await new Email(newUser, '').sendWelcome();
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
      new AppError('You are not logged in! Please log in to get access', 401),
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await db.users.findByPk(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'This token belonging to the user does no longer exist',
        401,
      ),
    );
  }

  // 4) Check if the user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password. Please log in again!', 401),
    );
  }

  // GRANT ACCESS to protected routes
  // res.locals.user = currentUser;
  req.user = currentUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 401),
      );
    }
    next();
  };

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await db.users.findByPk(+req.user.user_id);

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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // get user based on email
  if (!req.body.email) {
    return next(new AppError('Please provide your email!', 404));
  }

  const user = await db.users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return next(new AppError('There is no user with your email address', 404));
  }

  // generate reset token
  const resetToken = user.createPasswordResetToken();
  await user.save();
  try {
    await new Email(user, resetToken).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // get user based on reset token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.body.token)
    .digest('hex');

  const user = await db.users.findOne({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: {
        [Op.gt]: Date.now(),
      },
    },
  });

  // check if the token is invalid or has expired
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // update changedPasswordAt property for user
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;

  await user.save();

  // log the user in, send JWT
  createSendToken(user, 200, req, res);
});
