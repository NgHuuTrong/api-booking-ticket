import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ticket extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ticket_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    match_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'match',
        key: 'match_id'
      }
    },
    area: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    seat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    order_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expired: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ticket',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticket_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "match_id",
        using: "BTREE",
        fields: [
          { name: "match_id" },
        ]
      },
    ]
  });
  }
}
