'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodDonation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FoodDonation.belongsTo(models.User,{as: 'user', foreignKey: 'userId'});
    }
  };
  FoodDonation.init({
    itemName: DataTypes.STRING,
    estimatedQty: DataTypes.INTEGER,
    isReadyToEat: DataTypes.BOOLEAN,
    storageTemp: DataTypes.STRING,
    estimatedExpiration: DataTypes.STRING,
    isDonationComplete: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FoodDonation',
  });
  return FoodDonation;
};