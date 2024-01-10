'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NarudzbinaGorivo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NarudzbinaGorivo.init({
    narudzbinaId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Narudzbina',
        key: 'id',
      }
    },
    gorivoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Gorivo',
        key: 'id',
      }
    },
    kolicina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      }
    }
  }, {
    sequelize,
    modelName: 'NarudzbinaGorivo',
  });
  return NarudzbinaGorivo;
};