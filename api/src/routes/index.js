const { Router } = require('express');
const dietRoute = require('./dietsRoute')
const recipeRoute= require('./recipeRoute')


const router = Router();


router.use('/diets', dietRoute)
router.use('/recipes', recipeRoute)







module.exports = router;
