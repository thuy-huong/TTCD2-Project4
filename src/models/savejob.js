'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SaveJob extends Model {
        static associate(models) {
            SaveJob.belongsTo(models.User, { foreignKey: 'userId' });
            SaveJob.belongsTo(models.JobPost, { foreignKey: 'jobId' });
        }
    };

    SaveJob.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.TINYINT,
            defaultValue: 0 // Giá trị mặc định cho trạng thái
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
        modelName: 'SaveJob',
        primaryKey: ['userId', 'jobId'] // Đặt primary key cho userId và jobId
    });

    return SaveJob;
};