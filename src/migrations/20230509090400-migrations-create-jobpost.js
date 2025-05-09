'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('JobPosts', {
      jobId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'companyId',
          onDelete: 'CASCADE' // Hành động khi xóa
        }
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      requirements: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      benefits: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      jobType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      experienceRequired: {
        type: Sequelize.STRING,
        allowNull: true
      },
      salaryMin: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: true
      },
      salaryMax: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: true
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      deadline: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 1 // Giá trị mặc định cho trạng thái
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('JobPosts');
  }
};