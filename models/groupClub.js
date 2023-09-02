const _sequelize = require('sequelize');
const sequelize = require('../utils/database');

const GroupClub = sequelize.define(
  'group_clubs',
  {
    club_id: {
      type: _sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'clubs',
        key: 'club_id',
      },
    },
    group_id: {
      type: _sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'groups',
        key: 'group_id',
      },
    },
    wins: {
      type: _sequelize.INTEGER,
      allowNull: true,
    },
    draws: {
      type: _sequelize.INTEGER,
      allowNull: true,
    },
    points: {
      type: _sequelize.INTEGER,
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
        fields: [{ name: 'club_id' }],
      },
      {
        name: 'group_id',
        using: 'BTREE',
        fields: [{ name: 'group_id' }],
      },
    ],
  },
);

module.exports = GroupClub;
