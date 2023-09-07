module.exports = (sequelize, Sequelize, DataTypes) => {
  const Match = sequelize.define(
    'matches',
    {
      match_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      stadium_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'stadia',
          key: 'stadium_id',
        },
      },
      home_club_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'clubs',
          key: 'club_id',
        },
      },
      away_club_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'clubs',
          key: 'club_id',
        },
      },
      time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      default_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      remain_seats_north: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      remain_seats_south: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      remain_seats_west: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      remain_seats_east: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      happened: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      result: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      round: {
        type: DataTypes.STRING,
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
          fields: [{ name: 'match_id' }],
        },
        {
          name: 'stadium_id',
          using: 'BTREE',
          fields: [{ name: 'stadium_id' }],
        },
        {
          name: 'home_club_id',
          using: 'BTREE',
          fields: [{ name: 'home_club_id' }],
        },
        {
          name: 'away_club_id',
          using: 'BTREE',
          fields: [{ name: 'away_club_id' }],
        },
      ],
    },
  );
  return Match;
};
