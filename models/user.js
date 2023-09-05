module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      user_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: false,
        defaultValue: 'male',
      },
      phone: {
        type: DataTypes.STRING(12),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Must be an EMAIL ##CUSTOM MESSAGE##',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
        type: DataTypes.DATE,
        allowNull: true,
      },
      passwordResetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      passwordResetExpires: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: true,
        defaultValue: 'user',
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      photo: {
        type: DataTypes.STRING(200),
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
  return User;
};
