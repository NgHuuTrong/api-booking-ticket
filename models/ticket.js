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
      payer_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please provide payer name!',
          },
        },
      },
      payer_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please provide payer email!',
          },
        },
      },
      payer_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please provide payer phone!',
          },
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
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please provide price!',
          },
        },
      },
      code: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      expired: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      payment_id: {
        type: DataTypes.STRING,
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
  return Ticket;
};
