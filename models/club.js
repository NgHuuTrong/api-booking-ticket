import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class club extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    club_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    stadium_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'stadium',
        key: 'stadium_id'
      }
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    manager_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'club',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "club_id" },
        ]
      },
      {
        name: "stadium_id",
        using: "BTREE",
        fields: [
          { name: "stadium_id" },
        ]
      },
    ]
  });
  }
}
