'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Applications', {
      jobId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'JobPosts',
          key: 'jobId',
          onDelete: 'CASCADE'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userId',
          onDelete: 'CASCADE'
        }
      },
      profileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ApplicationProfile',
          key: 'profileId',
          onDelete: 'CASCADE'
        }
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0
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
      },
    }, {
      primaryKey: ['jobId', 'userId', 'profileId'] // Đặt primary key cho jobId, userId, profileId
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Applications');
  }
};