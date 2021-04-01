'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
            queryInterface.changeColumn('FoodDonations', 'createdAt', {
                type: Sequelize.DATEONLY,
                allowNull: true,
            }, )
        ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
            queryInterface.changeColumn('FoodDonations', 'createdAt', {
                type: Sequelize.DATE,
                allowNull: true,
            }, )
        ])
  }
};
