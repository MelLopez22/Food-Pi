const { Recipes, Diets } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");

//LISTO --- trae receta por id
const getRecipe = async (id, source) => {
  if (source === "api") {
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

//------------------------LIMPIEZA DE ARRAY
const cleanningArray = (arr) =>
  arr.map((el) => {
    return {
      id: el.id,
      name: el.title,
      resumenDelPlato: el.summary,

      healthScore: el.healthScore,

      pasoAPaso: el.analyzedInstructions,
      image: el.image,
      diets: el.diets,
      created: false,
    };
  });

  //------------------------TRAEME TODAS LAS RECETAS DE API O BDD ------------ SI HAY POR QUERY NAME UNA RECETA
  //listo
const getRecipeByName = async (name) => {
  //el name llega por query
  //buscar en bdd
  //-------------buscar en bdd aquellas que coincidan con el nombre o que contenga parte del nombre , la busqueda no debe ser exacta, traer todo el modelo y que incluya del modelo dietas el nombre al que esta asociada esa receta ==> retornar el valor cuando lo encuentre
  const recipesBdd = await Recipes.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
    },
    include: {
      model: Diets,
      attributes: ["name"], // Especificamos que solo queremos el campo 'name' de 'Diets'
    },
  });

  //buscar en api
  //-------------hacer una peticion a la api , mapear y preguntar si incluye el name q esta llegando, recordar tolowercase para que la busque no deba ser exacta ==> retornar ese valor
  const recipesApi = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    )
  ).data.results;

  //deberia recorrer results y traer solamente en un array las que coincidan conel name
  recipesApiFiltered = recipesApi.filter((el) =>
    el.title.toLowerCase().includes(name.toLowerCase())
  );

  //crear una funcion que limpie mi array es decir ,una funcion que va a recibir un array y por cada vuelta me va a devolver un objeto con las propiedade que me interesan
  const recipesApiCleaned = cleanningArray(recipesApiFiltered);

  return [...recipesApiCleaned, ...recipesBdd];

  //deberia crear un array que contenga todo lo resultados? y retornar ese array
  // si no se encuentra nada enviar mensaje de que la busqueda no arrojo resultados
};


//TRAE TODAS LAS RECETAS DE API Y BDD UNIFICADAS
const getAllRecipes = async()=> {
//consultar a mi bdd y que me traiga todas las recetas con sus dietas asociadastb 
//consultar mi api y que me traiga todas las recetas con sus dietas asociadas
//unificar todo en un array y retornar ese array 
//-----------------------consulto las recetas que hay en mi bdd 
const recipesFromDataBase = await Recipes.findAll({
  include: [
    {
      model: Diets,
      attributes: ["name"],
    },
  ],
});

const recipesFromApi = (await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4d3769ea6cbe4284b8e3dff7e1bbfe28&addRecipeInformation=true&number=100`)).data.results;
const recipesApiCleaned = cleanningArray(recipesFromApi);

return [...recipesFromDataBase, ...recipesApiCleaned]


}


module.exports = { getRecipe, getRecipeByName , getAllRecipes};
