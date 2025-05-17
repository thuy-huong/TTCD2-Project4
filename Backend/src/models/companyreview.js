'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CompanyReview.belongsTo(models.Company, { foreignKey: 'companyId', onDelete: 'CASCADE' });
      CompanyReview.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  };
  CompanyReview.init({
    companyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rating: DataTypes.TINYINT,
    review: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CompanyReview',
  });
  return CompanyReview;
};