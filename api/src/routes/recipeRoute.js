const {Router} = require('express');
const { postHandler, getAllRecipeHandler, getRecipeByIdHandler } = require('../handlers/recipeHandler');

const recipeRoute = Router();



        recipeRoute.get('/:id', getRecipeByIdHandler)


    // /querys
     recipeRoute.get('/', getAllRecipeHandler)

    
     recipeRoute.post('/', postHandler)

module.exports = recipeRoute

//     router.post('/recipes', (req, res)=>{
//     res.status(200).send('creando una receta')
//     })