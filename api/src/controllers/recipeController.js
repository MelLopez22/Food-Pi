const { Recipes, Diets } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");

const cleanningArray = (arr) => {
  if (Array.isArray(arr)) {
    return arr.map((el) => {
      //limpiar analizedintruccions
      const cleanningInfoApi = el.analyzedInstructions[0]?.step?.steps;
      const pasoapaso = cleanningInfoApi.map((e) => {
        // return { number: e.number, step: e.step };
        return { step: e.step };
      });

      return {
        id: el.id,
        name: el.title,
        resumenDelPlato: el.summary,
        healthScore: el.healthScore,
        pasoAPaso: pasoapaso,
        image: el.image,
        diets: el.diets,
        // Diets: el.diets,
        created: false,
      };
    });
  } else if (typeof arr === "object") {
    // Si arr es un objeto, creamos un nuevo objeto con la información deseada
    const cleanAnalizedInstructions = arr.analyzedInstructions[0]?.steps;
    const pasoAPasoCLEAN = cleanAnalizedInstructions.map((e) => {
      return { step: e.step };
      // return { number: e.number, step: e.step };
    });

    return {
      id: arr.id,
      name: arr.title,
      resumenDelPlato: arr.summary,
      healthScore: arr.healthScore,
      pasoAPaso: pasoAPasoCLEAN,
      image: arr.image,
      diets: arr.diets,
      // Diets: arr.diets,
      created: false,
    };
  } else {
    // Si arr no es un array ni un objeto, devolvemos un array vacío
    return [];
  }
};
const getRecipe = async (id, source) => {
  if (source === "api") {
    const recipeApi = (
      await axios(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      )
    ).data;

    const recipeApiCleaned = cleanningArray(recipeApi);

    return recipeApiCleaned;
  } //si es x bdd
  else {
    const recipe = await Recipes.findByPk(id, {
      include: {
        model: Diets,
        attributes: ["name"],
      },
    });
    //si existe la receta , si a encontro limpiarla si no la encontro devolver un mensaje que diga no se encontro receta
    if (recipe) {
      //limpiar el diets
      //retornar un objeto con las caracteristicas de siempre y a diets asignarle el valor limpio
      const dietsNames = recipe.Diets.map((diet) => diet.name);
      return {
        id: recipe.id,
        name: recipe.name,
        resumenDelPlato: recipe.resumenDelPlato,
        healthScore: recipe.healthScore,
        pasoAPaso: recipe.pasoAPaso,
        image: recipe.image,
        diets: dietsNames,
        // Diets: dietsNames,
        created: true,
      };
    } else {
      ("No se encontro la receta buscada");
    }
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

  if (recipesBdd) {
    //esto es un array mapear el array y en cada paso .Diets mapear y limpiar
    //limpiar el diets
    //retornar un objeto con las caracteristicas de siempre y a diets asignarle el valor limpio

    const recipesBddCLEAN = recipesBdd.map((recipe) => {
      const dietsNames = recipe.Diets.map((diet) => diet.name);
      return {
        id: recipe.id,
        name: recipe.name,
        resumenDelPlato: recipe.resumenDelPlato,
        healthScore: recipe.healthScore,
        pasoAPaso: recipe.pasoAPaso,
        image: recipe.image,
        diets: dietsNames,
        // Diets: dietsNames,
        created: true,
      };
    });
    return recipesBddCLEAN
  }

  const recipesApi = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    )
  ).data.results;

  const nameLower = name.toLowerCase();
  // se supone q me a un nuevo array con las coincidencias
  const recipesApiFiltered = recipesApi.filter((el) =>
    el.title.toLowerCase().includes(nameLower)
  );

  //mapear el nuevo array y devolver un array con objetos que esten limpios de info
  const recipesAPIcleaned = recipesApiFiltered.map((e) => {
    // console.log(el.analyzedInstructions[0].steps)

    const pasoapaso = e.analyzedInstructions[0].steps.map((e) => {
      return { step: e.step };
      // return { number: e.number, step: e.step };
    });
    return {
      id: e.id,
      name: e.title,
      resumenDelPlato: e.summary,
      healthScore: e.healthScore,
      pasoAPaso: pasoapaso,
      image: e.image,
      diets: e.diets,
      // Diets: e.diets,
      created: false,
    };
  });
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
    const diets = recipe.Diets.map((diet) => {
      return diet.name;
    });
    return {
      // Aquí, puedes incluir las demás propiedades de la receta que deseas devolver
      id: recipe.id,
      name: recipe.name,
      healthScore: recipe.healthScore,
      image: recipe.image,
      resumenDelPlato: recipe.resumenDelPlato,
      pasoAPaso: recipe.pasoAPaso,
      diets: diets,
      created: true
    };
  });

  // Retorna el resultado final, que es un array de objetos con las recetas y las dietas

  // Recetas de la API
  const recipesFromApi = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    )
  ).data.results;

  //me trae un array
  //aqui ingreso a steps q es un array con objetos con los datos q necesito
  // console.log(recipesFromApi[0].analyzedInstructions[0].steps)
  // console.log(recipesFromApi[0].analyzedInstructions[0].steps[0].number,recipesFromApi[0].analyzedInstructions[0].steps[0].step )

  const recipesApiCleaned = recipesFromApi.map((recipe) => {
    // console.log(recipe.analyzedInstructions[0].steps)
    //mapear steps recordar q es un array
    const stepsARR = recipe.analyzedInstructions[0]?.steps?.map((e) => {
      return {
        step: e.step,
      };
      // return {
      //   number: e.number,
      //   step: e.step,
      // };
    });
    console.log(stepsARR); //esto me devuelve un array limpio de info

    return {
      id: recipe.id,
      name: recipe.title,
      resumenDelPlato: recipe.summary,
      healthScore: recipe.healthScore,
      pasoAPaso: stepsARR,
      image: recipe.image,
      diets: recipe.diets,
      // Diets: recipe.diets,
      created: false,
    };
  });

  // Unificar recetas de la base de datos y la API
  return [...recipesBddCLEAN, ...recipesApiCleaned];
};

// Cierre del bloque de la función getAllRecipes

module.exports = { getRecipe, getRecipeByName, getAllRecipes };
