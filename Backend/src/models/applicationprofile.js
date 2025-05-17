'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApplicationProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ApplicationProfile.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    about: DataTypes.TEXT,
    experienceYears: DataTypes.DECIMAL,
    skills: DataTypes.TEXT,
    expectedSalary: DataTypes.DECIMAL,
    cvUrl: DataTypes.STRING,
    status: DataTypes.TINYINT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ApplicationProfile',
  });
  return ApplicationProfile;
};