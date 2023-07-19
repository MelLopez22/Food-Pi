require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Diets } = require("../db");

const handleDiets = async (req, res) => {
  // res.status(200).send('muestra todas las dietas')

  //en este array se encontraran los nombres de las dietas
  const dietNames = [];

  try {
    const rawInfo = (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      )
    ).data.results;
//aqui recorro mi results.diets para obtener las dietas y armar un nuevo array 
    rawInfo.map((elemento) => { return elemento.diets.map((el) =>dietNames.includes(el) ? null : dietNames.push(el)
        
      );
    });
//aqui insertamos los nombres de las dietas en la base de datos
    await Diets.bulkCreate(
        dietNames.map(nombre => ({ name: nombre }))
      );
//aqui me devuelve un array con todos los nombres de las dietas
    res.status(200).json(dietNames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handleDiets;
