const catchAsync = require('../utils/catchAsync');
const db = require('../utils/database');
const factory = require('./handleFactory');
const Op = require('sequelize').Op;

exports.getMatchesOfGroup = catchAsync(async (req, res, next) => {
  const groupClubs = await db.groupClubs.findAll({
    where: { group_id: req.params.group_id },
  });
  const clubs = groupClubs.map((ele) => ele.club_id);
  const matches = await db.matches.findAll({
    where: {
      home_club_id: {
        [Op.or]: clubs,
      },
    },
    attributes: [
      'round',
      'match_id',
      'home_club_id',
      'away_club_id',
      'time',
      'happened',
      'result',
    ],
    order: [['time', 'ASC']],
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
    ],
  });

  res.status(200).json({
    status: 'success',
    results: matches.length,
    data: {
      matches,
    },
  });
});

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
  as: 'group_clubs',
  foreignKey: 'group_id',
  include: {
    model: db.clubs,
    as: 'club',
    foreignKey: 'club_id',
    attributes: ['name', 'logo'],
  },
});

exports.createGroup = factory.createOne(db.groups);

exports.updateGroup = factory.updateOne(db.groups);

exports.deleteGroup = factory.deleteOne(db.groups);
