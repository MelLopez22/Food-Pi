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

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.paginate}>
        <Paginate cantidadPages={cantidadPages} />
      </div>

      <div className={styles.recipes}>
        {viewRecipes?.map((el) => {
          return (
            <div key={el.id}>
              <Card
                name={el.name}
                image={el.image}
                diets={el.diets}
                key={el.id}
                id={el.id}
                healthScore={el.healthScore ? el.healthScore : 0}
              />
            </div>
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
