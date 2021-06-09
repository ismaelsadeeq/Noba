'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
  };
  user.associate = function(models){
    user.hasMany(models.otpCode,{
      foreignKey:'userId'
    });
    user.hasOne(models.isLoggedOut,{
      foreignKey:'userId'
    });
  }
  user.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    terms: DataTypes.BOOLEAN,
    isVerified: DataTypes.BOOLEAN,
    isAdmin:DataTypes.BOOLEAN,
    permission:DataTypes.INTEGER,
    password: DataTypes.STRING,
  }, {
    sequelize,
    paranoid:true,
    modelName: 'user',
  });
  return user;
};