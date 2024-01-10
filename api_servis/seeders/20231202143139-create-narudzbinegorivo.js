'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('NarudzbinaGorivos', [
        {
            narudzbinaId: 1,
            gorivoId: 1,
            kolicina: 1
        },
        {
            narudzbinaId: 1,
            gorivoId: 2,
            kolicina: 2
        }
        ] );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('NarudzbinaGorivos', null, {});
  }
};
