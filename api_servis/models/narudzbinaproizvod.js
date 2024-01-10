'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NarudzbinaProizvod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NarudzbinaProizvod.init({
    narudzbinaId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Narudzbina',
        key: 'id',
      }
    },
    proizvodId:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Proizvod',
            key: 'id',
        }
    },
    kolicina:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1,
        }
    }

  }, {
    sequelize,
    modelName: 'NarudzbinaProizvod',
  });
  return NarudzbinaProizvod;
};