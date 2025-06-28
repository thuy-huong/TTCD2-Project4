'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Application.belongsTo(models.JobPost, { foreignKey: 'jobId', onDelete: 'CASCADE' });
      Application.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      // Application.belongsTo(models.ApplicationProfile, { foreignKey: 'profileId', onDelete: 'CASCADE' });
    }
  };
  Application.init({
    jobId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    profileId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};