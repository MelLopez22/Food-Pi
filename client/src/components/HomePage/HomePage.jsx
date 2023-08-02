// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

import NavBar from "../Navbar/NavBar";
import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addDiets,
  addRecipes,
  filterByCreated,
  filterByDiets,
  order,
  orderByHealthscore,
  reset,
} from "../../Redux/actions";
import styles from "./HomePage.module.css";
// import styles from "./Home.module.css";

export default function Homepage() {
  const dispatch = useDispatch();
  const { diets } = useSelector((state) => state);
  const { recipes } = useSelector((state) => state);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await axios.get("http://localhost:3001/recipes"))
          .data;
        dispatch(addRecipes(response));

        if (diets && diets.length === 0) {
          const responseDiets = (await axios.get("http://localhost:3001/diets"))
            .data;
          if (responseDiets.length > 0) {
            dispatch(addDiets(responseDiets));
          }
        }

        setIsChecked(false);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleOrder = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === "order") {
      dispatch(order(value));
    } else if (name === "orderByHealthscore") {
      dispatch(orderByHealthscore(value));
    }
  };

  //manejador de filtrado x dietas
  //solo esta hecho x tipos de dietas
  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    //si value corresponde a bdd o api , si es bdd comparar de recipes.create: true, si es de api created:false
    if (name === "api") {
      const filterAPI = recipes.filter((e) => {
        return e.created === false;
      });

      dispatch(filterByCreated(filterAPI));
    } else if (name === "bdd") {
      const filterBDD = recipes.filter((e) => {
        return e.created === true;
      });
      dispatch(filterByCreated(filterBDD));
    } else {
      const filtrado = checked
        ? recipes.filter((e) => {
            return e.diets.some(
              (diet) => diet.toLowerCase() === value.toLowerCase()
            );
          })
        : recipes; // Si no hay filtro activo, mantener las recetas sin cambios

      dispatch(filterByDiets([...filtrado]));
    }
  };

  const handleReset = () => {
    setSelectedCheckboxes([]);
    dispatch(reset());
  };

  return (
    <div className={styles.container}>
      <NavBar />

      <div className={styles.content}>
        <div className={styles.cardsFilterOrder}>
        
          {/* filtro y orden */}

          <div>
            {/* ordenar por name */}
            <select
              name="order"
              defaultValue={"DEFAULT"}
              onChange={handleOrder}
            >
              <option value="DEFAULT" disabled>
                Select Order
              </option>
              <option value="A">Ascendente</option>
              <option value="D">Descendente</option>
            </select>
            {/* ordenar por healthscore */}
            <select
              name="orderByHealthscore"
              defaultValue="DEFAULT"
              onChange={handleOrder}
            >
              <option value="DEFAULT" disabled>
                Ordenar por Healthscore{" "}
              </option>
              <option value="A">Ascendente</option>
              <option value="D">Descendente</option>
            </select>
            {/* filtrado */}
            <h3>FILTRADO POR TIPO DE DIETA</h3>
            {diets.map((name) => (
              <div key={name}>
                <input
                  type="checkbox"
                  id={name}
                  name={name}
                  value={name}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={name}>{name}</label>
              </div>
            ))}
            <div>
              <input
                type="checkbox"
                id={"bdd"}
                name={"bdd"}
                value={"bdd"}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={"bdd"}>{"Bdd"}</label>
            </div>
            <div>
              <input
                type="checkbox"
                id={"api"}
                name={"api"}
                value={"api"}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={"Api"}>{"Api"}</label>
            </div>

            <button onClick={handleReset}>RESET</button>
          </div>  {/* cards */}
          <div className={styles.sideCards}>
            <Cards />
          </div>
        </div>

        <div></div>
      </div>

      <Footer />
    </div>
  );
}
