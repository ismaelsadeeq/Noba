'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paystackVerification extends Model {
  };
  paystackVerification.associate = function(models){
    paystackVerification.belongsTo(models.user,{
      foreignKey:'userId'
    })
  }
  paystackVerification.init({
    status: DataTypes.STRING,
    message: DataTypes.STRING,
    userResponse: DataTypes.STRING,
    requestedData:DataTypes.STRING,
    reference: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'paystackVerification',
  });
  return paystackVerification;
};