const _sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Ticket = sequelize.define(
  'tickets',
  {
    ticket_id: {
      autoIncrement: true,
      type: _sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: _sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
    match_id: {
      type: _sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'matches',
        key: 'match_id',
      },
    },
    area: {
      type: _sequelize.STRING(10),
      allowNull: true,
    },
    seat: {
      type: _sequelize.DOUBLE,
      allowNull: true,
    },
    price: {
      type: _sequelize.FLOAT,
      allowNull: true,
    },
    code: {
      type: _sequelize.STRING(20),
      allowNull: true,
    },
    order_time: {
      type: _sequelize.DATE,
      allowNull: true,
    },
    expired: {
      type: _sequelize.BOOLEAN,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'ticket_id' }],
      },
      {
        name: 'user_id',
        using: 'BTREE',
        fields: [{ name: 'user_id' }],
      },
      {
        name: 'match_id',
        using: 'BTREE',
        fields: [{ name: 'match_id' }],
      },
    ],
  },
);

module.exports = Ticket;
