'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class referral extends Model {
  };
  referral.associate = function(models){
    referral.belongsTo(models.user,{
      foreignKey:'userId'
    })
  }
  referral.init({
    referralCode: DataTypes.STRING,
    referralBonus: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'referral',
  });
  return referral;
};