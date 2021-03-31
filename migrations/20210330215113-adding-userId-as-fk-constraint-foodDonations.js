'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
      'FoodDonations', {
      fields: ['userId'],
        type: 'FOREIGN KEY',
        references: {
          name: 'userid-fk-in-fooddonations',
          table: 'Users',
          field:'id'
        }
      }
    
    )
  },

  down: async (queryInterface, Sequelize) => {
   return queryInterface.removeConstraint(
      'FoodDonations',
      'userid-fk-in-fooddonations',
    ) 
  }

};
    
  
