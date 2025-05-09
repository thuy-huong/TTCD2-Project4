'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProfessionalPosition extends Model {
        static associate(models) {
            ProfessionalPosition.belongsTo(models.Categories, { foreignKey: 'categoryId' });
            ProfessionalPosition.hasMany(models.JobPostCategoriesPositionLevel, { foreignKey: 'positionId' });
        }
    }

    ProfessionalPosition.init({
        positionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        positionName: {
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
        modelName: 'ProfessionalPosition',
    });

    return ProfessionalPosition;
};