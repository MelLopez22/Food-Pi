const {Recipe} = require('../db')

const createRecipe = async (id, name, resumenDelPlato, pasoAPaso, healthScore)=> await Recipe.create({id, name, resumenDelPlato, pasoAPaso, healthScore})
//OJO FALTA LA IMAGEN



module.exports  = { createRecipe}