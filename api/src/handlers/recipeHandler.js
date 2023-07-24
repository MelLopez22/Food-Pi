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
  const { name } = req.query;

  try {
    const results = name
    //que tipo de datos me trae byname y getall
      ? await getRecipeByName(name)
      : await getAllRecipes();
// si mi results esta vacio
    // if (results.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "La raza especificada no existe" });
    // }

    
    //si tiene algo devolver el dato
    return res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};





module.exports = {
  postRecipeHandler,
  getAllRecipeHandler,
  getRecipeByIdHandler,
};
