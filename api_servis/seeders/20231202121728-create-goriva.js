'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Gorivos', [
        {
            id:"1",
            naziv:"Dizel",
            oznaka:"EUD",
            cena: 150
        },
        {
            id:"2",
            naziv:"Benzin 98",
            oznaka:"BMB 98",
            cena: 100
        },
        {
            id:"3",
            naziv:"Plin",
            oznaka:"PLIN",
            cena: 50
        }
        ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Gorivos', null, {});
  }
};
