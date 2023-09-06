const catchAsync = require('../utils/catchAsync');
const db = require('../utils/database');
const factory = require('./handleFactory');

exports.getALlClub = factory.getAll(db.clubs);

exports.getClub = factory.getOne(db.clubs, {
  model: db.stadia,
  as: 'stadium',
  foreignKey: 'stadium_id',
});

exports.createClub = factory.createOne(db.clubs);

exports.updateClub = factory.updateOne(db.clubs);

exports.deleteClub = factory.deleteOne(db.clubs);

exports.getClubLineUp = factory.getOne(db.clubs, {
  model: db.footballers,
  as: 'footballers',
});
