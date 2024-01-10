'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Uslugas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      naziv: {
          type: Sequelize.STRING(50),
          unique: true,
          allowNull: false,
          required: true,
      },
      opis: {
        type: Sequelize.STRING(100),
        allowNull: true,
        required: false,
      },
      cena: {
        type: Sequelize.FLOAT,
        allowNull: false,
        required: true,
      },
      tip_cene: {
        type: Sequelize.STRING(20),
        allowNull: false,
        required: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Uslugas');
  }
};