'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class JobPost extends Model {
        static associate(models) {
            JobPost.belongsTo(models.Company, { foreignKey: 'companyId' });
        }
    };

    JobPost.init({
        jobId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        requirements: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        benefits: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        jobType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        experienceRequired: {
            type: DataTypes.STRING,
            allowNull: true
        },
        salaryMin: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        salaryMax: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.TINYINT,
            defaultValue: 1 // Giá trị mặc định cho trạng thái
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'JobPost',
    });

    return JobPost;
};