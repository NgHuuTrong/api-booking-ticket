const _sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Stadium = sequelize.define(
  'stadia',
  {
    stadium_id: {
      autoIncrement: true,
      type: _sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    address: {
      type: _sequelize.STRING(200),
      allowNull: true,
    },
    capacity: {
      type: _sequelize.DOUBLE,
      allowNull: true,
    },
    name: {
      type: _sequelize.STRING(100),
      allowNull: true,
    },
    location: {
      type: _sequelize.STRING(100),
      allowNull: true,
    },
    image: {
      type: _sequelize.STRING(100),
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
        fields: [{ name: 'stadium_id' }],
      },
    ],
  },
);

module.exports = Stadium;
