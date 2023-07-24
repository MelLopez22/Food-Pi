const { Recipes, Diets } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");

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

// const createRecipe = async (
//   name,
//   resumenDelPlato,
//   pasoAPaso,
//   healthScore,
//   image,
//   created
// ) =>{ 
//   const newrec = await Recipes.create({
//     name,
//     resumenDelPlato,
//     pasoAPaso,
//     healthScore,
//     image,
//     created,
//   },);
 
//   return newrec

// }
 
//cuando traiga la info de la api necesito limpiarla , devolverla 
//y esa es la voy a enviar 

// const getRecipe = async (id, source) => {
//   //deberia pasarle un array a cleanrecipeinfo 
//   const recipeApi = (
//     await axios(
//       // `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
//       `https://api.spoonacular.com/recipes/${id}/information?apiKey=5c5b6e3c4b16413781c43cab91b337b1`
//     )
//   ).data.results
//   console.log(recipeApi)

//   const recipeApiCLeaned = cleanRecipesInfo(recipeApi)
//   console.log('recipes limpias', recipeApiCLeaned)
//   const recipe =
//     source === "api"
//       ? recipeApiCLeaned
//       : await Recipes.findByPk(id, {include:Diets});
//   return recipe;
// };
const getRecipe = async (id, source) => {
  if (source === "api") {
    // Realizar petición a la API
    const recipeApi = (
      await axios(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=5c5b6e3c4b16413781c43cab91b337b1`
      )
    ).data;

    const recipeApiCleaned = cleanRecipesInfo(recipeApi);
    return recipeApiCleaned;
  } else {
    // Realizar consulta en la base de datos
    const recipe = await Recipes.findByPk(id, { include: Diets });
    return recipe;
  }
};

const getRecipeByName = async (name) => {
  //buscar en bdd todos los que coincidan con name
  const recipesBdd = await Recipes.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
    }, include: Diets
  });
  const recipesApi = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    )
  ).data.results;

  const recipesJustClean = cleanRecipesInfo(recipesApi);

  const filteredApi = recipesJustClean.filter((el) =>
    //  el.name === name
    el.name.toLowerCase().includes(name.toLowerCase())
  );

  return [...recipesBdd, ...filteredApi];
};

const getAllRecipe = async () => {
  const recipesBdd = await Recipes.findAll();

  const recipesApi = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=5c5b6e3c4b16413781c43cab91b337b1&addRecipeInformation=true&number=100`
    )
  ).data.results;

  const recipesJustClean = cleanRecipesInfo(recipesApi);

  return [...recipesBdd, ...recipesJustClean];
};

module.exports = { getRecipe, getAllRecipe, getRecipeByName };
