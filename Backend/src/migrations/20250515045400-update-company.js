module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Companies', 'logo', {
        type: Sequelize.BLOB('long'),
        allowNull: true,
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Companies', 'logo', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    ])
  }
};