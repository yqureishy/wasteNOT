'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.hasMany(FoodDonation, {as: 'FoodDonations'});

      // define association here
    }
  };
  User.init({
    emailAsUsername: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    restaurantName: DataTypes.STRING,
    restaurantStreetAddress: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};