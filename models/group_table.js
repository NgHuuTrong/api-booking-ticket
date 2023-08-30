import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class group_table extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    group_table_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    table_name: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    rounds: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'group_table',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group_table_id" },
        ]
      },
    ]
  });
  }
}
