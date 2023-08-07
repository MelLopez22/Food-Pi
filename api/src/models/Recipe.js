const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

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
      type: DataTypes.JSON,
      allowNull: false,
    },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, 
  },
},
{timestamps:false})
};
