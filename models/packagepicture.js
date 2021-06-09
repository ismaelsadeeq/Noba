'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class packagePicture extends Model {
  };
  packagePicture.associate = function(models){
    packagePicture.belongsTo(models.commodityPackage,{
      foreignKey:'packageId'
    });
  }
  packagePicture.init({
    picture: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'packagePicture',
  });
  return packagePicture;
};