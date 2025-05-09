'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ApplicationProfile extends Model {
        static associate(models) {
            ApplicationProfile.hasMany(models.Applications, { foreignKey: 'profileId' });
        }
    }

    ApplicationProfile.init({
        profileId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        about: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        experienceYears: {
            type: DataTypes.DECIMAL(5, 1),
            allowNull: true
        },
        skills: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        expectedSalary: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        cvUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.TINYINT,
            defaultValue: 1
        }
    }, {
        sequelize,
        modelName: 'ApplicationProfile',
    });

    return ApplicationProfile;
};