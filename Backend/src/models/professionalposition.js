'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfessionalPosition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProfessionalPosition.belongsTo(models.Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
      ProfessionalPosition.belongsToMany(models.JobPost, {
        through: models.JobPostCategoriesPositionLevel,
        foreignKey: 'positionId'
      });
    }
  };
  ProfessionalPosition.init({
    categoryId: DataTypes.INTEGER,
    positionName: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.TINYINT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ProfessionalPosition',
  });
  return ProfessionalPosition;
};