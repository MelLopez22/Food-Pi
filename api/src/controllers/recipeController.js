const {Recipes} = require('../db')
require('dotenv').config();
const {
    API_KEY
  } = process.env;
  const axios = require("axios");



const createRecipe = async ( 
    name,
    resumenDelPlato,
    pasoAPaso,
    healthScore,
    image)=> await Recipes.create({name,resumenDelPlato,pasoAPaso,healthScore, image});
    
    
    const getRecipe = async (id, source)=>{
        const recipe = source === 'api'?
       ( await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data:
        await Recipes.findByPk(id);
        console.log('soy el loggg', recipe)
        return recipe
    }
module.exports={createRecipe, getRecipe}