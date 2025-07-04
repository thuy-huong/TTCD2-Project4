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
      ProfessionalPosition.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'categoryData' });

    }
  };
  ProfessionalPosition.init({
    categoryId: DataTypes.INTEGER,
    PositionNameEn: DataTypes.STRING,
    PositionNameVi: DataTypes.STRING,
    description: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ProfessionalPosition',
  });
  return ProfessionalPosition;
};