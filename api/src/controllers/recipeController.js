const { Recipes, Diets } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");




//------------------------LIMPIEZA DE ARRAY
const cleanningArray = (arr) => {
  if (Array.isArray(arr)) {
    return arr.map((el) => {
      //limpiar analizedintruccions
      const cleanningInfoApi = el.analyzedInstructions[0]?.step?.steps;
      const pasoapaso = cleanningInfoApi.map((e) => {
        return { number: e.number, step: e.step };
      });

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
    const cleanAnalizedInstructions = arr.analyzedInstructions[0]?.steps;
    const pasoAPasoCLEAN = cleanAnalizedInstructions.map((e) => {
      return { number: e.number, step: e.step };
    });

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
      await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    ).data;
    console.log(typeof recipeApi, "tipo de dato de la api");
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
        attributes: ["name"],
      },
    });
    console.log(recipe);
    // recipe.pasoAPaso = formatSteps(recipe.pasoAPaso);
    return recipe;
  }
};

const getRecipeByName = async (name) => {
  const recipesBdd = await Recipes.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Diets,
      attributes: ["name"],
    },
  });

  const recipesBddCLEAN = recipesBdd.map((recipe) => {
    console.log(recipe, "esto es cada elemento del array q vino de la bdd");
    const diets = recipe.Diets.map((diet) => ({
      name: diet.name,
      DietId: diet.RecipeDiet.DietId,
    }));

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

  const recipesApi = (
    await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
  ).data.results;

  const nameLower = name.toLowerCase();
  // se supone q me a un nuevo array con las coincidencias
  const recipesApiFiltered = recipesApi.filter((el) =>
    el.title.toLowerCase().includes(nameLower)
  );

//mapear el nuevo array y devolver un array con objetos que esten limpios de info
const recipesAPIcleaned = recipesApiFiltered.map(e=>{
  // console.log(el.analyzedInstructions[0].steps)

  const pasoapaso= e.analyzedInstructions[0].steps.map(e=>{return {number: e.number, step: e.step}})
    return {
      id: e.id,
      name: e.title,
      resumenDelPlato: e.summary,
      healthScore: e.healthScore,
      pasoAPaso: pasoapaso,
      image: e.image,
      Diets: e.diets,
      created: false,
  }
})
  return [...recipesBddCLEAN, ...recipesAPIcleaned];
};

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
  const recipesBddCLEAN = recipesFromDataBase.map((recipe) => {
    const diets = recipe.Diets.map((diet) => ({
      name: diet.name,
      DietId: diet.RecipeDiet.DietId}))

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

    })


  // Recetas de la API
  const recipesFromApi = (
    await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
  ).data.results;

  //me trae un array
  //aqui ingreso a steps q es un array con objetos con los datos q necesito
  // console.log(recipesFromApi[0].analyzedInstructions[0].steps)
  // console.log(recipesFromApi[0].analyzedInstructions[0].steps[0].number,recipesFromApi[0].analyzedInstructions[0].steps[0].step )


  const recipesApiCleaned = recipesFromApi.map((recipe) => {
// console.log(recipe.analyzedInstructions[0].steps)
//mapear steps recordar q es un array 
const stepsARR = recipe.analyzedInstructions[0]?.steps?.map(e=>{
  return {
    number: e.number,
    step: e.step
  }
})
console.log(stepsARR)//esto me devuelve un array limpio de info 


    return {
      id: recipe.id,
      name: recipe.title,
      resumenDelPlato: recipe.summary,
      healthScore: recipe.healthScore,
      pasoAPaso: stepsARR,
      image: recipe.image,
      Diets: recipe.diets,
      created: false,
    };
  }); 

  // Unificar recetas de la base de datos y la API
  return [...recipesBddCLEAN, ...recipesApiCleaned];

};

module.exports = { getRecipe, getRecipeByName, getAllRecipes };
