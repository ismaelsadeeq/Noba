'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class partnership extends Model {
  };
  partnership.associate = function(models){
    partnership.belongsTo(models.user,{
      foreignKey:'userId'
    });
    partnership.hasMany(models.commodityPackage,{
      foreignKey:'packageId'
    });
  }
  partnership.init({
    packageName: DataTypes.STRING,
    amount: DataTypes.STRING,
    percentageProfit: DataTypes.STRING,
    payoutDate: DataTypes.STRING,
    estimatedProfit: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'partnership',
  });
  return partnership;
};