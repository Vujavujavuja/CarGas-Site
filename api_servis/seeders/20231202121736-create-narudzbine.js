'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Narudzbinas',
    [
      {
        id:"1",
        uslugaId:"1",
        total_cena:"1000"
      }
    ]
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Narudzbina', null, {});
  }
};
