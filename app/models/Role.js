'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.User, { as: "users", through: 'user_role', foreignKey: 'role_id' })
    }
  }
  Role.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING
    },
    }, {
    sequelize,
    tableName: 'roles',
    modelName: 'Role',
    timestamps: false
  });
  return Role;
};