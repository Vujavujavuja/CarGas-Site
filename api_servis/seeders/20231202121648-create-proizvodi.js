'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Proizvods', [
        {
            id:"1",
            naziv:"Antifriz",
            tip:"Antifriz",
            opis:"Antifriz za automobile",
            cena: 150
        },
        {
            id:"2",
            naziv:"Ulje",
            tip:"Ulje",
            opis:"Ulje za automobile",
            cena: 1000
        },
        {
            id:"3",
            naziv:"Akumulator",
            tip:"Akumulator",
            opis:"Akumulator za automobile",
            cena: 15000
        }
        ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Proizvods', null, {});
  }
};
