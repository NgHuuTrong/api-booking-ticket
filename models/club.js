module.exports = (sequelize, Sequelize, DataTypes) => {
  const Club = sequelize.define(
    'clubs',
    {
      club_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      stadium_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'stadia',
          key: 'stadium_id',
        },
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      manager_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      logo: {
        type: DataTypes.STRING(300),
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
  return Club;
};
