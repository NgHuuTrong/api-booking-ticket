import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class grouptable_club extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    club_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'club',
        key: 'club_id'
      }
    },
    group_table_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'group_table',
        key: 'group_table_id'
      }
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    draws: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'grouptable_club',
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
        name: "group_table_id",
        using: "BTREE",
        fields: [
          { name: "group_table_id" },
        ]
      },
    ]
  });
  }
}
