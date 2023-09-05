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
        type: DataTypes.STRING(10),
        allowNull: true,
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
    },
  );
  return Ticket;
};
