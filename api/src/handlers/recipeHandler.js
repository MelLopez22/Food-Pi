const { getRecipe, getRecipeByName, getAllRecipes } = require("../controllers/recipeController");
const { Recipes, Diets } = require("../db");
const axios = require("axios");
const {Op} = require('sequelize')
require("dotenv").config();
const { API_KEY } = process.env;



//listo ---------- CREAR UNA RECETA EN BDD
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

    // Crea la receta
    const newRecipe = await Recipes.create({
      name,
      resumenDelPlato,
      pasoAPaso,
      healthScore,
      image,
    });

    // Asocia las dietas a la receta
    if (diets && Array.isArray(diets) && diets.length > 0) {
      const dietsToAssociate = await Diets.findAll({ where: { id: diets } });
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      await newRecipe.setDiets(dietsToAssociate);
    }

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//listo ---------------- TRAER UNA RECETA X ID , SEA DE BDD O DE API
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


const getAllRecipeHandler = async (req, res) => {
  //preguntar si hay por query name ?
  //si hay hacer una funcion que me traiga la receta con sus atributos y sus dietas asociadas
  //si no hay traeme todas la recetas que encuentres
  //declarar una constante que va a tener el valor de uno u otro resultado y eso es lo que se va a devolver

  try {
    const { name } = req.query;
    const recipes = name ? await getRecipeByName(name) : await getAllRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  // ---------------------------------------------Limpiar y combinar las recetas de la API
  // const recipesJustClean = cleanRecipesInfo(recipesApi);
  // const filteredApi = name
  //   ? recipesJustClean.filter((el) =>
  //       el.name.toLowerCase().includes(name.toLowerCase())
  //     )
  //   : recipesJustClean;

  // -----------------------------Combinar las recetas de la base de datos con las recetas limpias de la API
  // const allRecipes = [...recipesBdd, ...filteredApi];

  // Eliminar dietas duplicadas
  // const dietsApi = [...new Set(allRecipes.flatMap((recipe) => recipe.diets))];
};

module.exports = {
  postRecipeHandler,
  getAllRecipeHandler,
  getRecipeByIdHandler,
};
