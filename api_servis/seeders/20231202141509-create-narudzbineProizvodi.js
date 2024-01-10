'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('NarudzbinaProizvods',
    [
      {
        narudzbinaId:"1",
        proizvodId:"1",
        kolicina:"3"
      },
      {
        narudzbinaId:"1",
        proizvodId:"2",
        kolicina:"2"
      },
      {
        narudzbinaId:"1",
        proizvodId:"3",
        kolicina:"1"
      }
    ]
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('NarudzbinaProizvod', null, {});
  }
};
