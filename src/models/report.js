'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Report extends Model {
        static associate(models) {
            Report.belongsTo(models.Users, { foreignKey: 'userId' });
            Report.belongsTo(models.JobPost, { foreignKey: 'jobId' });
        }
    }

    Report.init({
        reportId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Report',
    });

    return Report;
};