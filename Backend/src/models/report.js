'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Report.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Report.belongsTo(models.JobPost, { foreignKey: 'jobId', onDelete: 'CASCADE' });
    }
  };
  Report.init({
    userId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    reason: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};