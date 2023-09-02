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
      type: _sequelize.ENUM('male', 'female', 'other'),
      allowNull: false,
      defaultValue: 'male',
    },
    phone: {
      type: _sequelize.STRING(12),
      allowNull: true,
    },
    email: {
      type: _sequelize.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be an EMAIL ##CUSTOM MESSAGE##',
        },
      },
    },
    password: {
      type: _sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please provide password',
        },
        is: {
          args: ['^[0-9a-f]{64}$', 'i'],
          msg: 'Password contains invalid characters',
        },
        len: {
          args: [8, 32],
          msg: 'Password must have in range [8, 32]',
        },
      },
    },
    password_confirm: {
      type: _sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please confirm your password',
        },
        checkSame() {},
      },
    },
    change_password_at: {
      type: _sequelize.DATE,
      allowNull: true,
    },
    passwordResetToken: {
      type: _sequelize.STRING,
      allowNull: true,
    },
    passwordResetExpires: {
      type: _sequelize.STRING,
      allowNull: true,
    },
    address: {
      type: _sequelize.STRING(200),
      allowNull: true,
    },
    role: {
      type: _sequelize.ENUM('user', 'admin'),
      allowNull: true,
      defaultValue: 'user',
    },
    active: {
      type: _sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    photo: {
      type: _sequelize.STRING(200),
      allowNull: true,
    },
  },
  {
    validate: {
      checkPasswordSame() {
        if (this.password !== this.password_confirm) {
          throw new Error('Passwords are not the same!');
        }
      },
    },
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
