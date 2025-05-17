'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JobPost.belongsTo(models.Company, { foreignKey: 'companyId', onDelete: 'CASCADE' });
      JobPost.hasMany(models.SaveJob, { foreignKey: 'jobId', onDelete: 'CASCADE' });
      JobPost.hasMany(models.Application, { foreignKey: 'jobId', onDelete: 'CASCADE' });
      JobPost.hasMany(models.Report, { foreignKey: 'jobId', onDelete: 'CASCADE' });
      JobPost.belongsToMany(models.Category, {
        through: models.JobPostCategoriesPositionLevel,
        foreignKey: 'jobId'
      });
    }
  };
  JobPost.init({
    companyId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    requirements: DataTypes.TEXT,
    benefits: DataTypes.TEXT,
    jobType: DataTypes.STRING,
    experienceRequired: DataTypes.STRING,
    salaryMin: DataTypes.DECIMAL,
    salaryMax: DataTypes.DECIMAL,
    location: DataTypes.STRING,
    deadline: DataTypes.DATE,
    status: DataTypes.TINYINT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'JobPost',
  });
  return JobPost;
};