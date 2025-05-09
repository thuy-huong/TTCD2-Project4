'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
        static associate(models) {
            Categories.hasMany(models.ProfessionalPosition, { foreignKey: 'categoryId' });
        }
    }

    Categories.init({
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        categoryName: {
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
        modelName: 'Categories',
    });

    return Categories;
};