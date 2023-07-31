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

          console.log('data diets', (await axios.get("http://localhost:3001/diets")).data)
//verificar si existe diets , y si length es igual a cero hacer la peticion , si no nada 
if (diets && diets.length === 0) {
  const responseDiets = (await axios.get("http://localhost:3001/diets")).data;
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

  //manejador de filtrado
//solo esta hecho x tipos de dietas
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const filtrado = checked
      ? recipes.filter((e) =>{
         return e.diets.some((diet) => diet.toLowerCase() === value.toLowerCase())}
        )
      : 'dios me ampareeeee lpm';
  
    dispatch(filterByDiets([...filtrado]))
  };

  const handleReset = () => {
    setSelectedCheckboxes([]);
    dispatch(reset());
  };

  return (
    <div className={styles.container}>
      <NavBar />

      <div className={styles.content}>
        {/* cards */}
        <div className={styles.sideCards}>
          <Cards />
        </div>
        <div>
          {/* ordenar por name */}
          <select name="order" defaultValue={"DEFAULT"} onChange={handleOrder}>
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
          <button onClick={handleReset}>RESET</button>
        </div>

        <div></div>
      </div>

      <Footer />
    </div>
  );
}
