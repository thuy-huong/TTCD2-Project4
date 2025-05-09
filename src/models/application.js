'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Applications extends Model {
        static associate(models) {
            Applications.belongsTo(models.JobPost, { foreignKey: 'jobId' });
            Applications.belongsTo(models.User, { foreignKey: 'userId' });
            Applications.belongsTo(models.ApplicationProfile, { foreignKey: 'profileId' });
        }
    }

    Applications.init({
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        profileId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Applications',
        primaryKey: ['jobId', 'userId', 'profileId']
    });

    return Applications;
};