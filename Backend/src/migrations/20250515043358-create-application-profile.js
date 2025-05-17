'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ApplicationProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.TEXT
      },
      experienceYears: {
        type: Sequelize.DECIMAL
      },
      skills: {
        type: Sequelize.TEXT
      },
      expectedSalary: {
        type: Sequelize.DECIMAL
      },
      cvUrl: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.TINYINT
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ApplicationProfiles');
  }
};