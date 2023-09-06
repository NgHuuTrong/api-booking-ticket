const db = require('../utils/database');
const factory = require('./handleFactory');

exports.getALlFootballer = factory.getAll(db.footballers);

exports.getFootballer = factory.getOne(db.footballers, {
  model: db.clubs,
  as: 'club',
  foreignKey: 'club_id',
  attributes: ['name', 'logo'],
});

exports.createFootballer = factory.createOne(db.footballers);

exports.updateFootballer = factory.updateOne(db.footballers);

exports.deleteFootballer = factory.deleteOne(db.footballers);
