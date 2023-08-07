const {Router} = require('express');
const { postRecipeHandler, getAllRecipeHandler, getRecipeByIdHandler } = require('../handlers/recipeHandler');

const recipeRoute = Router();



        recipeRoute.get('/:id', getRecipeByIdHandler)


     recipeRoute.get('/', getAllRecipeHandler)

    
     recipeRoute.post('/', postRecipeHandler)

module.exports = recipeRoute

