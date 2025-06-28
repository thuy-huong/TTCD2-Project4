'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('JobPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyId: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      requirements: {
        type: Sequelize.TEXT
      },
      benefits: {
        type: Sequelize.TEXT
      },
      jobType: {
        type: Sequelize.STRING
      },
      experienceRequired: {
        type: Sequelize.STRING
      },
      salaryMin: {
        type: Sequelize.DECIMAL
      },
      salaryMax: {
        type: Sequelize.DECIMAL
      },
      location: {
        type: Sequelize.STRING
      },
      deadline: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('JobPosts');
  }
};