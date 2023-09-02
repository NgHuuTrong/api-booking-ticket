const _sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Match = sequelize.define(
  'matches',
  {
    match_id: {
      autoIncrement: true,
      type: _sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    stadium_id: {
      type: _sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'stadia',
        key: 'stadium_id',
      },
    },
    home_club_id: {
      type: _sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'clubs',
        key: 'club_id',
      },
    },
    away_club_id: {
      type: _sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'clubs',
        key: 'club_id',
      },
    },
    time: {
      type: _sequelize.DATE,
      allowNull: true,
    },
    default_price: {
      type: _sequelize.FLOAT,
      allowNull: true,
    },
    remain_seats_north: {
      type: _sequelize.DOUBLE,
      allowNull: true,
    },
    remain_seats_south: {
      type: _sequelize.DOUBLE,
      allowNull: true,
    },
    remain_seats_west: {
      type: _sequelize.DOUBLE,
      allowNull: true,
    },
    remain_seats_east: {
      type: _sequelize.DOUBLE,
      allowNull: true,
    },
    happened: {
      type: _sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    result: {
      type: _sequelize.STRING(10),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'match_id' }],
      },
      {
        name: 'stadium_id',
        using: 'BTREE',
        fields: [{ name: 'stadium_id' }],
      },
      {
        name: 'home_club_id',
        using: 'BTREE',
        fields: [{ name: 'home_club_id' }],
      },
      {
        name: 'away_club_id',
        using: 'BTREE',
        fields: [{ name: 'away_club_id' }],
      },
    ],
  },
);

module.exports = Match;
