'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CompanyReviews extends Model {
        static associate(models) {
            CompanyReviews.belongsTo(models.Companies, { foreignKey: 'companyId' });
            CompanyReviews.belongsTo(models.Users, { foreignKey: 'userId' });
        }
    }

    CompanyReviews.init({
        reviewId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.TINYINT,
            validate: {
                min: 1,
                max: 5
            },
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'CompanyReviews',
    });

    return CompanyReviews;
};