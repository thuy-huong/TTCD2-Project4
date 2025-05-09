'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class JobLevels extends Model {
        static associate(models) {
            JobLevels.hasMany(models.JobPostCategoriesPositionLevel, { foreignKey: 'levelId' });
        }
    }

    JobLevels.init({
        levelId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        levelName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.TINYINT,
            defaultValue: 1
        }
    }, {
        sequelize,
        modelName: 'JobLevels',
    });

    return JobLevels;
};