const catchAsync = require('../utils/catchAsync');
const db = require('../utils/database');
const factory = require('./handleFactory');
const Op = require('sequelize').Op;

exports.getMatchesOfClub = catchAsync(async (req, res, next) => {
  const matches = await db.matches.findAll({
    where: {
      [Op.or]: [
        {
          home_club_id: req.params.club_id,
        },
        {
          away_club_id: req.params.club_id,
        },
      ],
    },
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

exports.getALlClub = factory.getAll(db.clubs);

exports.getClub = factory.getOne(db.clubs, [
  {
    model: db.stadia,
    as: 'stadium',
    foreignKey: 'stadium_id',
  },
  {
    model: db.footballers,
    as: 'footballers',
  },
]);

exports.createClub = factory.createOne(db.clubs);

exports.updateClub = factory.updateOne(db.clubs);

exports.deleteClub = factory.deleteOne(db.clubs);

exports.getClubLineUp = factory.getOne(db.clubs, {
  model: db.footballers,
  as: 'footballers',
});
