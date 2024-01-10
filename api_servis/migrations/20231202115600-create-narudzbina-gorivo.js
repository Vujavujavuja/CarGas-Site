'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NarudzbinaGorivos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      narudzbinaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Narudzbinas',
          key: 'id',
        },
        allowNull: false,
      },
      gorivoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Gorivos',
          key: 'id',
        },
        allowNull: false,
      },
      kolicina:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        }
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
    await queryInterface.dropTable('NarudzbinaGorivos');
  }
};