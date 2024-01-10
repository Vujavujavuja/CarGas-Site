'use strict';

const {query} = require("express");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Uslugas', [
        {
            id:"1",
            naziv:"Pranje automobila",
            opis:"Zeton za pranje automobila na perionici",
            cena: 100,
            tip_cene: "1 Zeton"
        },
        {
            id:"2",
            naziv:"Iznajmljivanje prikolice",
            opis:"Iznajmljivanje prikolice za prevoz automobila",
            cena: 1200,
            tip_cene: "Dan"
        },
        {
            id:"3",
            naziv:"Kosenje trave",
            opis:"Kosenje trave po potrebi",
            cena: 500,
            tip_cene: "Sat"
        }
        ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Uslugas', null, {});
  }
};
