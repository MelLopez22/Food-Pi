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

// const getRecipeByName = async (name) => {
//   // Buscar en la base de datos todas las recetas que coincidan con el nombre
//   const recipesBdd = await Recipes.findAll({
//     where: {
//       name: {
//         [Op.like]: `%${name}%`,
//       },
//     },
//     include: {
//       model: Diets,
//       attributes: ['name'], // Especificamos que solo queremos el campo 'name' de 'Diets'
//     },
//   });

//   // Obtener las recetas de la API
//   const recipesApi = (
//     await axios.get(
//       `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
//     )
//   ).data.results;

//   // Limpiar las recetas de la API e incluir las dietas asociadas
//   const recipesJustClean = cleanRecipesInfo(recipesApi);

//   // Filtrar las recetas de la API según el nombre
//   const filteredApi = recipesJustClean.filter((el) =>
//     el.name.toLowerCase().includes(name.toLowerCase())
//   );

//   return [...recipesBdd, ...filteredApi];
// };



// const getAllRecipe = async () => {
//   // Traigo las recetas de mi base de datos incluyendo las dietas asociadas
//   const recipesBdd = await Recipes.findAll({
//     include: Diets,
//   });

//   const recipesApi = (
//     await axios.get(
//       `https://api.spoonacular.com/recipes/complexSearch?apiKey=5c5b6e3c4b16413781c43cab91b337b1&addRecipeInformation=true&number=100`
//     )
//   ).data.results;

//   // Limpio el array de la API y agrego las dietas asociadas si existen
//   const recipesJustClean = cleanRecipesInfo(recipesApi);

//   recipesJustClean.forEach((el, index) => {
//     const diets = recipesApi[index].diets;
//     if (diets && diets.length > 0) {
//       el.diets = diets;
//     }
//   });

//   return [...recipesBdd, ...recipesJustClean];
// };



const getRecipeByName = async (name) => {
  //paso a minuscula
  const tolowercaseName = name.toLowerCase();
  //peticion a la bdd
  //traigo todo lo q hay en mi bdd de recetas
  const recipesDataBase = await Recipes.findAll({
    where: { name: { [Op.iLike]: "%" + tolowercaseName + "%" } },
    //que me incluya el modelo dietas
    include: {
      model: Diets,
      attributes:['name']
    },
  });


  //peticion a la api
  //recordar el .results
  const allRecipesRaw= (await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4d3769ea6cbe4284b8e3dff7e1bbfe28&addRecipeInformation=true&number=100`))
    .data.results;
    //uso la funcion de limpieza 
  const allRecipesResults = cleanRecipesInfo(allRecipesRaw);

  const allRecipesResultByName = allRecipesResults.filter((elem) =>
    elem.name.toLowerCase().includes(tolowercaseName)
  );

  return [...recipesDataBase, ...allRecipesResultByName];
};

const getAllRecipes = async () => {
  const recipesFromDataBase = await Recipes.findAll({
    include: [
      {
        model: Diets,
        attributes: ["name"],
      },
    ],
  });
  const recipesFromApiRaw = (await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4d3769ea6cbe4284b8e3dff7e1bbfe28&addRecipeInformation=true&number=100`))
  .data.results;

  const apiRecipes = cleanRecipesInfo(recipesFromApiRaw);
  return [...recipesFromDataBase, ...apiRecipes];
};




module.exports = { getRecipe, getAllRecipes, getRecipeByName };
