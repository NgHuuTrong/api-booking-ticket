module.exports = (sequelize, Sequelize, DataTypes) => {
  const Stadium = sequelize.define(
    'stadia',
    {
      stadium_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      address: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      capacity: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      coordinates: {
        type: DataTypes.STRING(50),
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
  return Stadium;
};
