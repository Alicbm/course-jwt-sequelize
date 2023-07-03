'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { as: 'posts', foreignKey: 'user_id' })
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          msg: 'El nombre solo puede contener letras'
        },
        len: {
          args: [2, 255],
          msg: "El nombre debe contar entre 2 y 255 caracteres"
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 255],
          msg: "La contraseña debe contar entre 6 y 255 caracteres"
        }
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true, 
      validate: {
        isEmail: {
          msg: "el email debe tener un formato valido"
        }

      }
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: false
  });
  return User;
};