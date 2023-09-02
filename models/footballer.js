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
    appearance: {
      type: _sequelize.INTEGER,
      allowNull: true,
    },
    weight: {
      type: _sequelize.STRING(10),
      allowNull: true,
    },
    height: {
      type: _sequelize.STRING(10),
      allowNull: true,
    },
    photo: {
      type: _sequelize.STRING(100),
      allowNull: true,
    },
    nationality: {
      type: _sequelize.STRING(50),
      allowNull: true,
    },
    image_nationality: {
      type: _sequelize.STRING(100),
      allowNull: true,
    },
    captain: {
      type: _sequelize.BOOLEAN,
      allowNull: true,
    },
    position: {
      type: _sequelize.ENUM('Goalkeeper', 'Defender', 'Midfielder', 'Attacker'),
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        timestamps: false,
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
