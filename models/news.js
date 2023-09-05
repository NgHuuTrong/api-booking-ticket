module.exports = (sequelize, Sequelize, DataTypes) => {
  const News = sequelize.define(
    'news',
    {
      news_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      thumbnail: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM('article', 'video'),
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'news_id' }],
        },
      ],
    },
  );
  return News;
};
