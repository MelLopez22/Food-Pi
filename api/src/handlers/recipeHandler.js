const { getRecipe, getAllRecipe, getRecipeByName} = require("../controllers/recipeController");
const {Recipes, Diets}=require('../db')
const axios = require('axios')

const cleanRecipesInfo = (arr) =>
  arr.map((el) => {
    return {
      id: el.id,
      name: el.title,
      resumenDelPlato: el.summary,

      healthScore: el.healthScore,

      pasoAPaso: el.analyzedInstructions,
      image: el.image,
      created: false,
    };
  });

//listo
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
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      await newRecipe.setDiets(dietsToAssociate);
    }

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//listo
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
  try {
    const { name } = req.query;

    // Obtener todas las recetas de la base de datos con sus dietas asociadas
    const recipesBdd = name
      ? await getRecipeByName(name)
      : await getAllRecipe();

    // Obtener todas las recetas de la API junto con sus tipos de dietas
    const recipesApi = (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=5c5b6e3c4b16413781c43cab91b337b1&addRecipeInformation=true&number=100`
      )
    ).data.results;

    // Obtener todas las dietas de la API
    const dietsApi = recipesApi.reduce((acc, recipe) => {
      recipe.diets.forEach((diet) => {
        if (!acc.includes(diet)) {
          acc.push(diet);
        }
      });
      return acc;
    }, []);

    // Limpiar y combinar las recetas de la API
    const recipesJustClean = cleanRecipesInfo(recipesApi);
    const filteredApi = name
      ? recipesJustClean.filter((el) =>
          el.name.toLowerCase().includes(name.toLowerCase())
        )
      : recipesJustClean;

    // Combinar las recetas de la base de datos con las recetas limpias de la API
    const allRecipes = [...recipesBdd, ...filteredApi];

    res.status(200).json({ recipes: allRecipes, diets: dietsApi });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  postRecipeHandler,
  getAllRecipeHandler,
  getRecipeByIdHandler,
};
