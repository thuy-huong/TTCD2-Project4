'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('JobPosts', 'level', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn('JobPosts', 'jobType', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('JobPosts', 'level', {
        type: Sequelize.STRING, // hoặc kiểu cũ nếu bạn biết rõ là gì
        allowNull: true,
      }),
      queryInterface.changeColumn('JobPosts', 'jobType', {
        type: Sequelize.STRING, // hoặc kiểu cũ nếu bạn biết rõ là gì
        allowNull: true,
      }),
    ]);
  },
};
