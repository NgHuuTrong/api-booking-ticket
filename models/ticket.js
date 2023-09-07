const AppError = require('../utils/appError');
const qrcode = require('qrcode');

module.exports = (sequelize, Sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    'tickets',
    {
      ticket_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
      match_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'matches',
          key: 'match_id',
        },
      },
      area: {
        type: DataTypes.ENUM('north', 'west', 'east', 'south'),
        allowNull: true,
        validate: {
          isIn: {
            args: [['north', 'west', 'east', 'south']],
            msg: 'Invalid area!',
          },
        },
      },
      seat: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      code: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      expired: {
        type: DataTypes.BOOLEAN,
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
      hooks: {
        beforeCreate: async function (ticket) {
          const qr = await qrcode.toDataURL(
            `${ticket.user_id}-${ticket.match_id}-${ticket.area}-${ticket.seat}`,
          );

          ticket.code = qr;
        },
      },
    },
  );
  return Ticket;
};
