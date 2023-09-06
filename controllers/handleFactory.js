const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // const doc = await Model.findByIdAndDelete(req.params.id);

    const doc = await Model.findByPk(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    await doc.destroy();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByPk(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    await doc.update(req.body);
    await doc.save();

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  });

exports.getOne = (Model, inclOptions) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByPk(req.params.id, { include: inclOptions });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model, inclOptions) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findAll({ include: inclOptions });

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
