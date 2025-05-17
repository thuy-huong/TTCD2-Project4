'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobPostCategoriesPositionLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JobPostCategoriesPositionLevel.belongsTo(models.JobPost, { foreignKey: 'jobId', onDelete: 'CASCADE' });
      JobPostCategoriesPositionLevel.belongsTo(models.Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
      JobPostCategoriesPositionLevel.belongsTo(models.ProfessionalPosition, { foreignKey: 'positionId', onDelete: 'CASCADE' });
      JobPostCategoriesPositionLevel.belongsTo(models.JobLevel, { foreignKey: 'levelId', onDelete: 'CASCADE' });
    }
  };
  JobPostCategoriesPositionLevel.init({
    jobId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    positionId: DataTypes.INTEGER,
    levelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'JobPostCategoriesPositionLevel',
  });
  return JobPostCategoriesPositionLevel;
};