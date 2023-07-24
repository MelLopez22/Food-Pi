//LOS HANDLERS NO DEBEN INTERACTUAR CON LOS MODELOS

const { getRecipe, getAllRecipe, getRecipeByName} = require("../controllers/recipeController");
const {Recipes, Diets}=require('../db')


const postRecipeHandler = async (req, res) => {
  try {
    const { name, resumenDelPlato, pasoAPaso, healthScore, image, diets } = req.body;

    // Crea la receta
    const newRecipe = await Recipes.create({
      name,
      resumenDelPlato,
      pasoAPaso,
      healthScore,
      image});

    // Asocia las dietas a la receta
    if (diets && Array.isArray(diets) && diets.length > 0) {
      const dietsToAssociate = await Diets.findAll({ where: { id: diets } });
      await newRecipe.setDiets(dietsToAssociate);
    }

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const getAllRecipeHandler = async (req, res) => {
  
  try {
    const { name } = req.query;
  const result = name ? await getRecipeByName (name) : await getAllRecipe ()
  res.status(200).json(result)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
   
//try catch
    //que me traiga tooodas las recetas, las de la api y las de la bdd mia 
    //mapeo y filtro de la info que quiero que me traiga ,armar una estructura 
    //funcion que me unifique ambas y me devuelva directamente la info 
};



//funcion que obtiene una receta por su id
//LIMPIAR la info
// const getRecipeByIdHandler = async (req, res) => {
//   try {
//     // const { id } = req.params;
//     const id = parseInt(req.params.id);

//     const source = isNaN(id) ? "bdd" : "api";
//     const recipe = await getRecipe(id, source);
//     res.status(200).json(recipe);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
const getRecipeByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;

    // Verificar si el id es un número o un string con solo números
    const isNumericId = /^\d+$/.test(id);

    let source;
    if (isNumericId) {
      source = "api";
    } else {
      source = "bdd";
    }

    const recipe = await getRecipe(id, source);
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
