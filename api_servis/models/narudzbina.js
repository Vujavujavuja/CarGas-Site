'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Narudzbina extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Proizvod, {
        through: models.NarudzbinaProizvod,
        as: 'proizvodi',
        foreignKey: 'narudzbinaId',
        allowNull: true,
      });
      this.belongsToMany(models.Gorivo, {
        through: models.NarudzbinaGorivo,
        as: 'goriva',
        foreignKey: 'narudzbinaId',
        allowNull: true,
      });
      this.belongsTo(models.Usluga, {
        foreignKey: 'uslugaId',
        as: 'usluga',
        allowNull: true,
      });
    }
  }
  Narudzbina.init({
    total_cena: {
      type: DataTypes.FLOAT,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Narudzbina',
  });
  return Narudzbina;
};