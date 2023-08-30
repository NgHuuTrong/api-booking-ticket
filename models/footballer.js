import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class footballer extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    footballer_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    club_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'club',
        key: 'club_id'
      }
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    injured: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('male','female'),
      allowNull: false
    },
    captain: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    position: {
      type: DataTypes.ENUM('ST','RW','LW','AM','CM','CDM','LB','CB','RB','GK'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'footballer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "footballer_id" },
        ]
      },
      {
        name: "club_id",
        using: "BTREE",
        fields: [
          { name: "club_id" },
        ]
      },
    ]
  });
  }
}
