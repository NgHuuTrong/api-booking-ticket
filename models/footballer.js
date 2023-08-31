const _sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Footballer = sequelize.define(
  'footballers',
  {
    footballer_id: {
      autoIncrement: true,
      type: _sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: _sequelize.STRING(100),
      allowNull: false,
    },
    club_id: {
      type: _sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'clubs',
        key: 'club_id',
      },
    },
    number: {
      type: _sequelize.INTEGER,
      allowNull: true,
    },
    birthdate: {
      type: _sequelize.DATEONLY,
      allowNull: true,
    },
    injured: {
      type: _sequelize.BOOLEAN,
      allowNull: true,
    },
    gender: {
      type: _sequelize.ENUM('male', 'female'),
      allowNull: false,
    },
    captain: {
      type: _sequelize.BOOLEAN,
      allowNull: true,
    },
    position: {
      type: _sequelize.ENUM(
        'ST',
        'RW',
        'LW',
        'AM',
        'CM',
        'CDM',
        'LB',
        'CB',
        'RB',
        'GK',
      ),
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'footballer_id' }],
      },
      {
        name: 'club_id',
        using: 'BTREE',
        fields: [{ name: 'club_id' }],
      },
    ],
  },
);

module.exports = Footballer;
