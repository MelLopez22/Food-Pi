import { useSelector } from "react-redux";
import Card from "../Card/Card";
import styles from "./Cards.module.css";
import Paginate from "../Paginate/Paginate";

function Cards() {
  const { recipes, numPage } = useSelector((state) => state);

  let desde = (numPage - 1) * 9;
  let hasta = numPage * 9;

  let cantidadPages = Math.floor(recipes.length / 9);
  let viewRecipes = recipes.slice(desde, hasta);

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
      <div className={styles.paginate}> 
        <Paginate cantidadPages={cantidadPages} />
      </div>

      <div className={styles.recipes}>
         {viewRecipes?.map((el) => {
        const dietsArray = returnArray(el.Diets);
        return (
          <Card
            name={el.name}
            image={el.image}
            diets={dietsArray}
            key={el.id}
            id={el.id}
          />
        );
      })}
      </div>
     
      <div className={styles.paginate}>
        <Paginate cantidadPages={cantidadPages} />
      </div>
    </div>
  );
}

export default Cards;
