//LOS HANDLERS NO DEBEN INTERACTUAR CON LOS MODELOS

const { createRecipe , getRecipe} = require("../controllers/recipeController");


//funcion q va a crear una receta
const postRecipeHandler = async (req, res) => {
  try {
    const { name, resumenDelPlato, pasoAPaso, healthScore, image } = req.body;
    //OJO FALTA LA IMAGEN
    console.log(name, resumenDelPlato, pasoAPaso, healthScore);
    const newRecipe = await createRecipe(
      name,
      resumenDelPlato,
      pasoAPaso,
      healthScore,
      image
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
//try catch
    //que me traiga tooodas las recetas, las de la api y las de la bdd mia 
    //mapeo y filtro de la info que quiero que me traiga ,armar una estructura 
    //funcion que me unifique ambas y me devuelva directamente la info 
};
//funcion que obtiene una receta por su id
const getRecipeByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    const recipe = await getRecipe(id, source);
    console.log(source, recipe)
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postRecipeHandler,
  getAllRecipeHandler,
  getRecipeByIdHandler,
};
