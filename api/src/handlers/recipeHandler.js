const { getRecipe, getRecipeByName, getAllRecipes } = require("../controllers/recipeController");
const { Recipes, Diets } = require("../db");
require("dotenv").config();



const postRecipeHandler = async (req, res) => {
  try {
    const {
      name,
      resumenDelPlato,
      pasoAPaso,
      healthScore,
      image,
      diets,
    } = req.body;

    const newRecipe = await Recipes.create({
      name,
      resumenDelPlato,
      pasoAPaso,
      healthScore,
      image,
    });

    if (diets && Array.isArray(diets) && diets.length > 0) {
      const dietsToAssociate = await Diets.findAll({ where: { id: diets } });
      await newRecipe.setDiets(dietsToAssociate);
    }

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRecipeByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;

    const isNumericId = /^\d+$/.test(id);

    let source = isNumericId? 'api':'bdd'
   

    const recipe = await getRecipe(id, source);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getAllRecipeHandler = async (req, res) => {


  try {
    const { name } = req.query;
    const recipes = name ? await getRecipeByName(name) : await getAllRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  
};

module.exports = {
  postRecipeHandler,
  getAllRecipeHandler,
  getRecipeByIdHandler,
};
