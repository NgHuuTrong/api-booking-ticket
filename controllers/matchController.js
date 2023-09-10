const db = require('../utils/database');
const factory = require('./handleFactory');

exports.getALlMatch = factory.getAll(db.matches, [
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
]);

exports.getMatch = factory.getOne(db.matches, [
  {
    model: db.clubs,
    as: 'home_club',
    foreignKey: 'home_club_id',
  },
  {
    model: db.clubs,
    as: 'away_club',
    foreignKey: 'away_club_id',
  },
  {
    model: db.stadia,
    as: 'stadium',
    foreignKey: 'stadium_id',
  },
]);

exports.createMatch = factory.createOne(db.matches);

exports.updateMatch = factory.updateOne(db.matches);

exports.deleteMatch = factory.deleteOne(db.matches);
