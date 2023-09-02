const _sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Club = sequelize.define(
  'clubs',
  {
    club_id: {
      autoIncrement: true,
      type: _sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: _sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    stadium_id: {
      type: _sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'stadia',
        key: 'stadium_id',
      },
    },
    city: {
      type: _sequelize.STRING(50),
      allowNull: true,
    },
    description: {
      type: _sequelize.STRING(300),
      allowNull: true,
    },
    manager_name: {
      type: _sequelize.STRING(100),
      allowNull: true,
    },
    logo: {
      type: _sequelize.STRING(300),
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
        name: 'stadium_id',
        using: 'BTREE',
        fields: [{ name: 'stadium_id' }],
      },
    ],
  },
);

module.exports = Club;
