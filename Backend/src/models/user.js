'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.AllCode, { foreignKey: 'id', onDelete: 'CASCADE' });
      User.hasMany(models.SaveJob, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(models.Application, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(models.CompanyReview, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(models.Report, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(models.Message, { foreignKey: 'senderId', onDelete: 'CASCADE' });
      User.hasMany(models.Message, { foreignKey: 'receiverId', onDelete: 'CASCADE' });
    }
  };
  User.init({
    roleId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};