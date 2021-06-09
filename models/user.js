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
    user.hasMany(models.referral,{
      foreignKey:'userId'
    })
    user.hasOne(models.bankDetail,{
      foreignKey:'userId'
    })
    user.hasOne(models.wallet,{
      foreignKey:'userId'
    });
    user.hasMany(models.partnership,{
      foreignKey:'userId'
    });
    user.hasMany(models.paystackVerification,{
      foreignKey:'userId'
    });
  }
  user.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    profilePicture:DataTypes.STRING,
    birthday:DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    workingPlace:DataTypes.STRING,
    state:DataTypes.STRING,
    terms: DataTypes.BOOLEAN,
    isVerified: DataTypes.BOOLEAN,
    isAdmin:DataTypes.BOOLEAN,
    permission:DataTypes.INTEGER,
    referralCode:DataTypes.STRING,
    isSuspended:DataTypes.BOOLEAN,
    password: DataTypes.STRING,
  }, {
    sequelize,
    paranoid:true,
    modelName: 'user',
  });
  return user;
};