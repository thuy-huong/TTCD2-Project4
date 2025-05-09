'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class JobPostCategoriesPositionLevel extends Model {
        static associate(models) {
            JobPostCategoriesPositionLevel.belongsTo(models.JobPost, { foreignKey: 'jobId' });
            JobPostCategoriesPositionLevel.belongsTo(models.Categories, { foreignKey: 'categoryId' });
            JobPostCategoriesPositionLevel.belongsTo(models.ProfessionalPosition, { foreignKey: 'positionId' });
            JobPostCategoriesPositionLevel.belongsTo(models.JobLevels, { foreignKey: 'levelId' });
        }
    }

    JobPostCategoriesPositionLevel.init({
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        positionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        levelId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'JobPostCategoriesPositionLevel',
        primaryKey: ['jobId', 'categoryId', 'positionId', 'levelId']
    });

    return JobPostCategoriesPositionLevel;
};