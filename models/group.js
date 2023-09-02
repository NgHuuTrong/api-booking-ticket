const _sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Group = sequelize.define(
  'groups',
  {
    group_id: {
      autoIncrement: true,
      type: _sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    group_name: {
      type: _sequelize.STRING(1),
      allowNull: true,
    },
    season: {
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
        fields: [{ name: 'group_id' }],
      },
    ],
  },
);

module.exports = Group;
