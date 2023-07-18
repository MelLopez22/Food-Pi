const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //OJO FALTA LA IMAGEN
  sequelize.define('Recipes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumenDelPlato: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
    },
    pasoAPaso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  }})
};
