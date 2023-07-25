import { useSelector } from "react-redux";
import Card from "../Card/Card";
function Cards() {
  const { recipes } = useSelector((state) => state);
  // limpiar recipes
  // recorrer recipes y en cada objeto en la propiedad diets
  // preguntar si es un array o es un objeto
  // si es un array mapear y devolver cada valor para ser mostrado
  // si es un objeto recorrer y en la propiedad name extraer los valores y armar un array
  // devolvemos entonces un array con los nombres
  // y eso es lo q pasamos x props
  function returnArray() {
    const dietsNamesArray = recipes.map((el) => {
      if (Array.isArray(el.Diets)) {
        // Si Diets es un array de objetos, extraemos los nombres
        return el.Diets.map((diet) => diet.name);
      } else {
        // Si Diets es un array de strings, simplemente lo devolvemos
        return el.Diets;
      }
    });
  
    return dietsNamesArray;
  }
  
  return (
    <div>
      {recipes?.map((el) => {
         const dietsArray = returnArray(el.Diets);
        return (
          <Card name={el.name} image={el.image} diets={dietsArray} key={el.id} />
        );
      })}
    </div>
  );
}

export default Cards;
