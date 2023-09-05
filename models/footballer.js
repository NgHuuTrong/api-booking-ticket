module.exports = (sequelize, Sequelize, DataTypes) => {
  const Footballer = sequelize.define(
    'footballers',
    {
      footballer_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      club_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'clubs',
          key: 'club_id',
        },
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      injured: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      appearance: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weight: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      height: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      nationality: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      image_nationality: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      captain: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      position: {
        type: DataTypes.ENUM(
          'Goalkeeper',
          'Defender',
          'Midfielder',
          'Attacker',
        ),
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          timestamps: false,
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'footballer_id' }],
        },
        {
          name: 'club_id',
          using: 'BTREE',
          fields: [{ name: 'club_id' }],
        },
      ],
    },
  );
  return Footballer;
};
