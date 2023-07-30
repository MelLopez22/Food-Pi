const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
//usar la apikey del mail principal o la del mail creado si se agotan las peticiones por dia 
const { Diets } = require('../db')

const getAllDietsExists = async()=>{
    const dietNames = [];
    //traigo mi info recorro para obtener los nombres de las dietas que existen 
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
return dietNames
}

module.exports={getAllDietsExists}