'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaveJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SaveJob.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      SaveJob.belongsTo(models.JobPost, { foreignKey: 'jobId', onDelete: 'CASCADE' });
    }
  };
  SaveJob.init({
    userId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    status: DataTypes.TINYINT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SaveJob',
  });
  return SaveJob;
};