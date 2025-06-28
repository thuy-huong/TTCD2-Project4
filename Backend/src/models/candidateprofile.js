'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CandidateProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CandidateProfile.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    about: DataTypes.TEXT,
    position: DataTypes.STRING,
    experienceYears: DataTypes.INTEGER,
    expectedSalary: DataTypes.DECIMAL,
    cvUrl: DataTypes.STRING,
    status: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CandidateProfile',
  });
  return CandidateProfile;
};