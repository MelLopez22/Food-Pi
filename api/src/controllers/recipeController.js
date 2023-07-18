const {Recipes} = require('../db')

const createRecipe = async ( 
    name,
    resumenDelPlato,
    pasoAPaso,
    healthScore)=> await Recipes.create({name,resumenDelPlato,pasoAPaso,healthScore});
    


module.exports={createRecipe}