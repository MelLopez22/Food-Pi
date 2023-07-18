const { Router } = require('express');
const dietRoute = require('./dietsRoute')
const recipeRoute= require('./recipeRoute')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();


router.use('/diets', dietRoute)
router.use('/recipes', recipeRoute)







module.exports = router;
