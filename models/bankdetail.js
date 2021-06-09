'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bankDetail extends Model {
  };
  bankDetail.associate = function(models){
    bankDetail.belongsTo(models.user,{
      foreignKey:'userId'
    })
  }
  bankDetail.init({
    idType: DataTypes.STRING,
    idNo: DataTypes.STRING,
    idPicture: DataTypes.STRING,
    bankName: DataTypes.STRING,
    bankCode:DataTypes.STRING,
    accountNumber: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'bankDetail',
  });
  return bankDetail;
};