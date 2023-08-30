import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class stadium extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    stadium_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    capacity: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    location: {
      type: "POINT",
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'stadium',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "stadium_id" },
        ]
      },
    ]
  });
  }
}
