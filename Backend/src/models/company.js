'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.belongsTo(models.AllCode, {
        foreignKey: 'companySize',
        targetKey: 'id',
        as: 'sizeData'
      });
      Company.hasMany(models.JobPost, { foreignKey: 'companyId', onDelete: 'CASCADE' });
      Company.hasMany(models.CompanyReview, { foreignKey: 'companyId', onDelete: 'CASCADE' });
    };
  };
  Company.init({
    companyName: DataTypes.STRING,
    industry: DataTypes.STRING,
    companySize: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    description: DataTypes.TEXT,
    logo: DataTypes.BLOB,
    status: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};