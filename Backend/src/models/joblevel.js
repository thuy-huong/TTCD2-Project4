'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JobLevel.belongsToMany(models.JobPost, {
        through: models.JobPostCategoriesPositionLevel,
        foreignKey: 'levelId'
      });
    }
  };
  JobLevel.init({
    levelName: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.TINYINT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'JobLevel',
  });
  return JobLevel;
};