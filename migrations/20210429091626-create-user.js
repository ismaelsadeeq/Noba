'use strict';

const { sequelize } = require("../src/api/auth/models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique:true,
        type: Sequelize.UUID
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      phoneNumber:{
        type: Sequelize.STRING
      },
      workingPlace:{
        type: Sequelize.STRING
      },
      state:{
        type: Sequelize.STRING
      },
      profilePicture:{
        type: Sequelize.STRING
      },
      birthday:{
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      terms:{
        type: Sequelize.BOOLEAN,
        defaultValue:false,
      },
      isVerified:{ 
        type:Sequelize.BOOLEAN,
        defaultValue:false,
      },
      isAdmin :{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
      },
      permission :{
        type:Sequelize.INTEGER,
        defaultValue:1,
      },
      referralCode :{
        type:Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING
      },
      isSuspended :{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt :{
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};