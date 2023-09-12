const multer = require('multer');
const sharp = require('sharp');
const cloudinary = require('cloudinary');
const DatauriParser = require('datauri/parser');
const path = require('path');

const db = require('../utils/database');
const factory = require('./handleFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const dataUri = new DatauriParser();

// Setup cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Store in buffer
const multerStorage = multer.memoryStorage();

// Check file is an image
const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(
      new AppError('This file is not an image! Please upload only image', 400),
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((ele) => {
    if (allowedFields.includes(ele)) newObj[ele] = obj[ele];
  });
  return newObj;
};

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer({ resolveWithObject: true });
  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400,
      ),
    );

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filteredObj(
    req.body,
    'name',
    'email',
    'gender',
    'phone',
    'address',
  );
  if (req.file) {
    // Convert buffer
    const imageFile = dataUri.format(
      path.extname(req.file.filename).toString(),
      req.file.buffer,
    );
    filteredBody.photo = imageFile.content;

    cloudinary.v2.uploader.upload(filteredBody.photo, async (error, result) => {
      filteredBody.photo = result.secure_url;

      // 3) Update user document
      const updateUser = await db.users.update(filteredBody, {
        where: { user_id: req.user.user_id },
        validate: true,
      });
      res.status(200).json({
        status: 'success',
        data: {
          updateUser,
        },
      });
    });
  } else {
    // 3) Update user document
    const updateUser = await db.users.update(filteredBody, {
      where: { user_id: req.user.user_id },
      validate: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        updateUser,
      },
    });
  }
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.user_id;
  next();
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await db.users.findByPk(req.user.user_id);
  await user.update({ active: false });
  await user.save();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.uploadUserPhoto = upload.single('photo');

exports.getALlUser = factory.getAll(db.users);

exports.getUser = factory.getOne(db.users);

exports.createUser = factory.createOne(db.users);

exports.updateUser = factory.updateOne(db.users);

exports.deleteUser = factory.deleteOne(db.users);

exports.getMyTickets = catchAsync(async (req, res, next) => {
  const myTickets = await db.tickets.findAll({
    where: { user_id: req.user.user_id },
    include: {
      model: db.matches,
      as: 'match',
      foreignKey: 'match_id',
      attributes: [
        'home_club_id',
        'away_club_id',
        'stadium_id',
        'time',
        'happened',
        'result',
      ],
      include: [
        {
          model: db.clubs,
          as: 'home_club',
          foreignKey: 'home_club_id',
          attributes: ['name', 'logo'],
        },
        {
          model: db.clubs,
          as: 'away_club',
          foreignKey: 'away_club_id',
          attributes: ['name', 'logo'],
        },
        {
          model: db.stadia,
          as: 'stadium',
          foreignKey: 'stadium_id',
          attributes: ['name'],
        },
      ],
    },
  });

  res.status(200).json({
    status: 'success',
    my_tickets: myTickets,
  });
});

exports.getMyTicketById = catchAsync(async (req, res, next) => {
  const ticket = await db.tickets.findByPk(req.params.ticket_id, {
    include: {
      model: db.matches,
      as: 'match',
      foreignKey: 'match_id',
      attributes: [
        'home_club_id',
        'away_club_id',
        'stadium_id',
        'time',
        'happened',
        'result',
      ],
      include: [
        {
          model: db.clubs,
          as: 'home_club',
          foreignKey: 'home_club_id',
          attributes: ['name', 'logo'],
        },
        {
          model: db.clubs,
          as: 'away_club',
          foreignKey: 'away_club_id',
          attributes: ['name', 'logo'],
        },
        {
          model: db.stadia,
          as: 'stadium',
          foreignKey: 'stadium_id',
          attributes: ['name', 'capacity', 'location', 'image', 'address'],
        },
      ],
    },
  });

  if (!ticket) {
    return next(new AppError('No document found with that ID', 404));
  }

  if (ticket.user_id !== req.user.user_id) {
    return next(new AppError('You are not logged in to this user', 404));
  }

  res.status(200).json({
    status: 'success',
    ticket,
  });
});
