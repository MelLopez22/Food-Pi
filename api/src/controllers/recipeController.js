const { Recipes } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op } = require('sequelize');


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

const createRecipe = async (
  name,
  resumenDelPlato,
  pasoAPaso,
  healthScore,
  image,
  created
) =>
  await Recipes.create({
    name,
    resumenDelPlato,
    pasoAPaso,
    healthScore,
    image,
    created,
  });

const getRecipe = async (id, source) => {
  const recipe =
    source === "api"
      ? (
          await axios(
            // `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=5c5b6e3c4b16413781c43cab91b337b1`
          )
        ).data
      : await Recipes.findByPk(id);
  console.log("soy el loggg", recipe);
  return recipe;
};

const getRecipeByName = async (name) => {
  //buscar en bdd todos los que coincidan con name
  const recipesBdd = await Recipes.findAll({  where: {
    name: {
      [Op.like]: `%${name}%`,
    },
  },});
  const recipesApi = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    )
  ).data.results;

  const recipesJustClean = cleanRecipesInfo(recipesApi);

  const filteredApi = recipesJustClean.filter((el)=>
    //  el.name === name
    el.name.toLowerCase().includes(name.toLowerCase())
  )

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

module.exports = { createRecipe, getRecipe, getAllRecipe, getRecipeByName };
