const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
//usar la apikey del mail principal o la del mail creado si se agotan las peticiones por dia 
const { Diets } = require('../db')

const getAllDietsExists = async () => {
  // Verificar si existen registros en la tabla Diets
  const existingDiets = await Diets.findAll();

  if (existingDiets.length > 0) {
    // Si la tabla ya tiene registros, simplemente devuelve los nombres de las dietas existentes
    return existingDiets.map((diet) => diet.name);
  } else {
    // Si la tabla está vacía, realiza la petición a la API y agrega las dietas
    const dietNames = [];
    const rawInfo = (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      )
    ).data.results;

    rawInfo.forEach((elemento) => {
      elemento.diets.forEach((el) => {
        if (!dietNames.includes(el)) {
          dietNames.push(el);
        }
      });
    });

    // Inserta los nombres de las dietas en la base de datos
    await Diets.bulkCreate(dietNames.map((nombre) => ({ name: nombre })));

    return dietNames;
  }
};

module.exports = { getAllDietsExists };
