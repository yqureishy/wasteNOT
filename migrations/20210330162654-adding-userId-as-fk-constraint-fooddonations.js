'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    
      return queryInterface.addConstraint(
        'FoodDonations', {
          fields: ['userId'], 
          type: 'FOREIGN KEY',
          references: {
            name: 'userId-fk-in-fooddonations',
            table: 'Users',
            field: 'id'

          }
        }
      )

  },

  down:  (queryInterface, Sequelize) => {
    
      return queryInterface.removeConstraint(
        'FoodDonations',
        'userId-fk-in-fooddonations'
      )

  }
};
