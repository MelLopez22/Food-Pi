import { useSelector } from "react-redux";
import Card from "../Card/Card";
import styles from './Cards.module.css'

function Cards() {
  
  const { recipes } = useSelector((state) => state);

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
    <div className={styles.cardsContainer}>
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
