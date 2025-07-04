'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CandidateProfile', {
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
      position: {
        type: Sequelize.STRING
      },
      experienceYears: {
        type: Sequelize.INTEGER
      },
      skills: {
        type: Sequelize.TEXT
      },
      expectedSalary: {
        type: Sequelize.DECIMAL
      },
      cvUrl: {
        type: Sequelize.BLOB
      },
      status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CandidateProfile');
  }
};