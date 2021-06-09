'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commodityPackage extends Model {
  };
  commodityPackage.associate = function(models){
    
    commodityPackage.belongsTo(models.partnership,{
      foreignKey:'packageId'
    });
    commodityPackage.hasMany(models.packagePicture,{
      foreignKey:'packageId'
    });
  }
  commodityPackage.init({
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    price: DataTypes.STRING,
    duration: DataTypes.STRING,
    profit: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'commodityPackage',
  });
  return commodityPackage;
};