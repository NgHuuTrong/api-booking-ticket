module.exports = (sequelize, Sequelize, DataTypes) => {
  const Group = sequelize.define(
    'groups',
    {
      group_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      group_name: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      season: {
        type: DataTypes.INTEGER,
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
          fields: [{ name: 'group_id' }],
        },
      ],
    },
  );
  return Group;
};
