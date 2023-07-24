const { getAllDietsExists } = require("../controllers/dietController");

const handleDiets = async (req, res) => {
  try {
    //aqui me devuelve un array con todos los nombres de las dietas y carga los nombres en bdd
    
    const allDiets = await getAllDietsExists();
    //respondo con el array de todos los nombres
    res.status(200).json(allDiets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handleDiets;
