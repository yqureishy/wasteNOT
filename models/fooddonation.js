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
      FoodDonation.hasOne(User, {as:'donor'});
      // define association here
    }
  };
  FoodDonation.init({
    itemName: DataTypes.STRING,
    estimatedQty: DataTypes.INTEGER,
    isReadyToEat: DataTypes.BOOLEAN,
    storageTemp: DataTypes.STRING,
    estimatedExpiration: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FoodDonation',
  });
  return FoodDonation;
};