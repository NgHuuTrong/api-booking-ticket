const _sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define(
  'users',
  {
    user_id: {
      autoIncrement: true,
      type: _sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: _sequelize.STRING(100),
      allowNull: false,
    },
    gender: {
      type: _sequelize.ENUM('male', 'female'),
      allowNull: false,
    },
    phone: {
      type: _sequelize.STRING(12),
      allowNull: true,
    },
    email: {
      type: _sequelize.STRING(100),
      allowNull: true,
    },
    password: {
      type: _sequelize.STRING(100),
      allowNull: true,
    },
    password_confirm: {
      type: _sequelize.STRING(100),
      allowNull: true,
    },
    change_password_at: {
      type: _sequelize.DATE,
      allowNull: true,
    },
    address: {
      type: _sequelize.STRING(200),
      allowNull: true,
    },
    role: {
      type: _sequelize.STRING(10),
      allowNull: true,
    },
    active: {
      type: _sequelize.BOOLEAN,
      allowNull: true,
    },
    avatar: {
      type: _sequelize.STRING(300),
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'user_id' }],
      },
    ],
  },
);

module.exports = User;
