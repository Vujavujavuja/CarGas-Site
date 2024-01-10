'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gorivo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Narudzbina, {
            through: models.NarudzbinaGorivo,
            as: 'narudzbine',
            foreignKey: 'gorivoId'
        });
    }
  }
  Gorivo.init({
    naziv:{
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    oznaka:{
      type: DataTypes.STRING(5),
      unique: true,
        allowNull: false,
    },
    cena:{
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Gorivo',
  });
  return Gorivo;
};