'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.ProfessionalPosition, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
      Category.belongsToMany(models.JobPost, {
        through: models.JobPostCategoriesPositionLevel,
        foreignKey: 'categoryId'
      });
    }
  };
  Category.init({
    categoryName: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.TINYINT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};