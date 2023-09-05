module.exports = (sequelize, Sequelize, DataTypes) => {
  const GroupClub = sequelize.define(
    'group_clubs',
    {
      club_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'clubs',
          key: 'club_id',
        },
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'groups',
          key: 'group_id',
        },
      },
      wins: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      draws: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      points: {
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
          fields: [{ name: 'club_id' }],
        },
        {
          name: 'group_id',
          using: 'BTREE',
          fields: [{ name: 'group_id' }],
        },
      ],
    },
  );
  return GroupClub;
};
