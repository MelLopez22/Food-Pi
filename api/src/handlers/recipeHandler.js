//LOS HANDLERS NO DEBEN INTERACTUAR CON LOS MODELOS

const { createRecipe } = require("../controllers/recipeController");



//funcion q va a crear una receta
const postRecipeHandler = async (req, res) => {
  try {
    const { name, resumenDelPlato, pasoAPaso, healthScore } = req.body;
    //OJO FALTA LA IMAGEN
    console.log(name, resumenDelPlato, pasoAPaso, healthScore)
    const newRecipe = await createRecipe(
      
      name,
      resumenDelPlato,
      pasoAPaso,
      healthScore
    );
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllRecipeHandler = (req, res) => {
  const { name } = req.query;
  name
    ? res.status(200).send(`soy la query : ${name}`)
    : res.status(200).send("me trae todas las recetas");
};
//funcion que obtiene una receta por su id
const getRecipeByIdHandler = (req, res) => {
  const { id } = req.params;

  res.status(200).send(`detalle de la receta con ${id}`);
};

module.exports = {
  postRecipeHandler,
  getAllRecipeHandler,
  getRecipeByIdHandler,
};
