const { Recipes, Diets } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");

// const formatSteps = (steps) => {
//   if (!Array.isArray(steps)) return [];

//   return steps.map((step, index) => ({
//     number: index + 1,
//     step,
//   }));
// };

// 

//LISTO --- trae receta por id

//------------------------LIMPIEZA DE ARRAY
const cleanningArray = (arr) => {
  if (Array.isArray(arr)) {
  
    return arr.map((el) => {
      //limpiar analizedintruccions 
      const cleanningInfoApi = el.analyzedInstructions[0].step.steps;
      const pasoapaso = cleanningInfoApi.map((e)=>{
        return {number:e.number, step:e.step}
      })
      
      return {
        id: el.id,
        name: el.title,
        resumenDelPlato: el.summary,
        healthScore: el.healthScore,
        pasoAPaso: pasoapaso,
        image: el.image,
        Diets: el.diets,
        created: false,
      };
    });
  } else if (typeof arr === "object") {
    // Si arr es un objeto, creamos un nuevo objeto con la información deseada
    const cleanAnalizedInstructions = arr.analyzedInstructions[0].steps
    const pasoAPasoCLEAN = cleanAnalizedInstructions.map((e)=>{
      return {number: e.number, step:e.step}

    })
    

        return {
      id: arr.id,
      name: arr.title,
      resumenDelPlato: arr.summary,
      healthScore: arr.healthScore,
      pasoAPaso: pasoAPasoCLEAN,
      image: arr.image,
      Diets: arr.diets,
      created: false,
    };
  } else {
    // Si arr no es un array ni un objeto, devolvemos un array vacío
    return [];
  }
};
//ARCHI LISTO NO SE TOCA MASSSSS
const getRecipe = async (id, source) => {
  //si es x api
  if (source === "api") {
    const recipeApi = (
      await axios(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      )
    ).data;
    console.log(typeof recipeApi, 'tipo de dato de la api')
//limpio la info cruda --------funcion para limpiar la infocruda
    const recipeApiCleaned = cleanningArray(recipeApi);
    // recipeApiCleaned.pasoAPaso = formatSteps(recipeApiCleaned.pasoAPaso);

    //si todo salio bien deberia estar devolviendo un array con los datos limpios
    return recipeApiCleaned;
  } //si es x bdd
  else {
    const recipe = await Recipes.findByPk(id, {
      include: {
        model: Diets,
        attributes: ['name']
      }
    });
    console.log(recipe)
    // recipe.pasoAPaso = formatSteps(recipe.pasoAPaso);
    return recipe;
  }
};


  const getRecipeByName = async (name) => {
    console.log(name, 'esto es name x query')
    const recipesBdd = await Recipes.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Utiliza Op.iLike para hacer la búsqueda insensible a mayúsculas y minúsculas
        },
      },
      include: {
        model: Diets,
        attributes: ["name"],
      },
    });
    
    console.log('esto es lo que hay en mi bdd')
   //recipes bdd es una matriz un array con varios objetos 
   //puedo recorrer cada obj y pasarle la funcion cleanning array creada a ver q pasa , dieta ahi no esta limpiada asi q veremos q trae ddz
   const recipesBddCLEAN = recipesBdd.map((recipe) => {
    console.log(recipe, 'esto es cada elemento del array q vino de la bdd')
    const diets = recipe.Diets.map((diet) => ({
      name: diet.name,
      DietId: diet.RecipeDiet.DietId
    }))

    return {
      id: recipe.id,
        name: recipe.name,
        resumenDelPlato: recipe.resumenDelPlato,
        healthScore: recipe.healthScore,
        pasoAPaso: recipe.pasoAPaso,
        image: recipe.image,
        Diets: diets,
        created: true,
    };
  });
  
    // const recipesApi = (
    //   await axios.get(
    //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    //   )
    // ).data.results;
  
    // recipesApiFiltered = recipesApi.filter((el) =>
    //   el.title.toLowerCase().includes(name.toLowerCase())
    // );
  
    // const recipesApiCleaned = cleanningArray(recipesApiFiltered);
    
    // // Formatear los pasos para cada receta en el array
    // recipesApiCleaned.forEach((recipe) => {
    //   recipe.pasoAPaso = formatSteps(recipe.pasoAPaso);
    // });
  
          return [...recipesBddCLEAN];}
  


//TRAE TODAS LAS RECETAS DE API Y BDD UNIFICADAS
const getAllRecipes = async () => {
  const recipesFromDataBase = await Recipes.findAll({
    include: [
      {
        model: Diets,
        attributes: ["name"],
      },
    ],
  });

  const recipesFromApi = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    )
  ).data.results;

  const recipesApiCleaned = cleanningArray(recipesFromApi);

  // Función para formatear los pasos de la receta en un array con objetos
  const formatSteps = (steps) => {
    if (!Array.isArray(steps)) return [];

    return steps.map((step, index) => ({
      number: index + 1,
      step,
    }));
  };

  // Formatear los pasos para cada receta en el array de la API
  recipesApiCleaned.forEach((recipe) => {
    recipe.pasoAPaso = formatSteps(recipe.pasoAPaso);
  });

  // Formatear los pasos para cada receta de la base de datos en el array
  recipesFromDataBase.forEach((recipe) => {
    recipe.pasoAPaso = formatSteps(recipe.pasoAPaso);
  });

  return [...recipesFromDataBase, ...recipesApiCleaned];
};

module.exports = { getRecipe, getRecipeByName, getAllRecipes };

