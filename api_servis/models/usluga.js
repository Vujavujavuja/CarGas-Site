'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usluga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Narudzbina, {
        foreignKey: 'uslugaId',
        as: 'narudzbine'
      });
    }
  }
  Usluga.init({
    naziv:{
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    opis:{
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: false,
    },
    cena:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tip_cene:{
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: false,
    }
  }, {
    sequelize,
    modelName: 'Usluga',
  });
  return Usluga;
};