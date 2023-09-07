const db = require('../utils/database');
const factory = require('./handleFactory');

exports.getALlGroup = factory.getAll(db.groups, {
  model: db.groupClubs,
  as: 'group_clubs',
  foreignKey: 'group_id',
  include: {
    model: db.clubs,
    as: 'club',
    foreignKey: 'club_id',
    attributes: ['name', 'logo'],
  },
});

exports.getGroup = factory.getOne(db.groups, {
  model: db.groupClubs,
  as: 'clubs',
  foreignKey: 'group_id',
  include: {
    model: db.clubs,
    as: 'details',
    foreignKey: 'club_id',
    attributes: ['name', 'logo'],
  },
});

exports.createGroup = factory.createOne(db.groups);

exports.updateGroup = factory.updateOne(db.groups);

exports.deleteGroup = factory.deleteOne(db.groups);
