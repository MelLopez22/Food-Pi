const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Diets', {
    id: {
      type: DataTypes.INTEGER, // Cambiamos a INTEGER para el autoincremental
      primaryKey: true,
      autoIncrement: true, // Establecemos autoIncrement como true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
}},
{timestamps:false})
};
