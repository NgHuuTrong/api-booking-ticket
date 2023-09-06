const AppError = require('../utils/appError');

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
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      order_time: {
        type: DataTypes.DATE,
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
      // hooks: {
      //   beforeCreate: async function (next) {
      //     const db = require('../utils/database');
      //     console.log('hi', this.area);
      //     const match = await db.matches.findByPk(this.match_id);

      //     if (match[`remain_seats_${this.match_id}`] <= 0) {
      //       return next(
      //         new AppError(
      //           'This area is full! Please check for the others!',
      //           404,
      //         ),
      //       );
      //     }
      //     match[`remain_seats_${this.area}`] -= 1;
      //     await match.save();
      //     next();
      //   },
      // },
    },
  );
  return Ticket;
};
