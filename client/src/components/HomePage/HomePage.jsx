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
import LoadingSpinner from "../Loader/Loader";

export default function Homepage() {
  const dispatch = useDispatch();
  const { diets } = useSelector((state) => state);
  const { recipes } = useSelector((state) => state);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
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
        setIsLoading(false)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setIsLoading(false)
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


  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
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
        : recipes; 

      dispatch(filterByDiets([...filtrado]));
    }
  };

  const handleReset = () => {
    setSelectedCheckboxes([]);
    dispatch(reset());
  };

  return (
    <div className={styles.container}>
      {isLoading? <LoadingSpinner/>:(<div >
      <NavBar />

      <div className={styles.content}>
        <div className={styles.cardsFilterOrder}>
        

          <div className={styles.order}>
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
          </div> 
          <div className={styles.sideCards}>
            <Cards />
          </div>
        </div>

        <div></div>
      </div>

      <Footer />
    </div>) }
    </div>
    
  );
}
