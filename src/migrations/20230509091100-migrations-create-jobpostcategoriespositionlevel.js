'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('JobPostCategoriesPositionLevel', {
      jobId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'JobPosts', // Đảm bảo tên bảng đúng
          key: 'jobId',
          onDelete: 'CASCADE'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories', // Tên bảng liên quan
          key: 'categoryId'
        }
      },
      positionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ProfessionalPosition', // Tên bảng liên quan
          key: 'positionId'
        }
      },
      levelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'JobLevels', // Tên bảng liên quan
          key: 'levelId'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('JobPostCategoriesPositionLevel');
  }
};