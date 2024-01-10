'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proizvod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.belongsToMany(models.Narudzbina, {
            through: models.NarudzbinaProizvod,
            as: 'narudzbine',
            foreignKey: 'proizvodId'
        });
    }
  }
  Proizvod.init({
    naziv:{
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    tip:{
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: false,
    },
    opis:{
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: false,
    },
    cena:{
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Proizvod',
  });
  return Proizvod;
};