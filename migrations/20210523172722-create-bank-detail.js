'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bankDetails', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique:true,
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.UUID,
        allowNull:false,
        onDelete:'CASCADE',
        references:{
          model:'users',
          key:'id',
          as:'userId'
        }
      },
      idType: {
        type: Sequelize.STRING
      },
      idNo: {
        type: Sequelize.STRING
      },
      idPicture: {
        type: Sequelize.STRING
      },
      bankName: {
        type: Sequelize.STRING
      },
      bankCode: {
        type: Sequelize.STRING
      },
      accountNumber: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('bankDetails');
  }
};