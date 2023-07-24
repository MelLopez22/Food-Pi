const { getRecipe } = require("../controllers/recipeController");
const { Recipes, Diets } = require("../db");
const axios = require("axios");
const {Op} = require('sequelize')
require("dotenv").config();
const { API_KEY } = process.env;

// const cleanRecipesInfo = (array) =>
//   array.map((element) => {
//     return {
//       id: element.id,
//       name: element.title,
//       image:
//         element.image && element.image.url
//           ? element.image.url
//           : element.reference_image_id
//           ? `https://cdn2.thedogapi.com/images/${element.reference_image_id}.jpg`
//           : null,
//       height: element.height?.metric || "",
//       weight: element.weight?.metric || "",
//       life_span: element.life_span,
//       created: false,
//       diets: element.diets
//     };
//   });

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
