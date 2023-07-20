const { getAllDietsExists } = require("../controllers/dietController");


const handleDiets = async (req, res) => {
  // res.status(200).send('muestra todas las dietas')

  //en este array se encontraran los nombres de las dietas
  
  try {
      //aqui me devuelve un array con todos los nombres de las dietas
      const allDiets = await getAllDietsExists();
    res.status(200).json(allDiets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handleDiets;
