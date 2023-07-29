// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

import NavBar from "../Navbar/NavBar";
import Cards from "../Cards/Cards";
import Paginate from "../Paginate/Paginate";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addDiets, addRecipes, order, orderByHealthscore } from "../../Redux/actions";
import styles from "./HomePage.module.css";
// import styles from "./Home.module.css";

export default function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await axios.get("http://localhost:3001/recipes"))
          .data;
        const responseDiets = (await axios.get("http://localhost:3001/diets"))
          .data;

        dispatch(addRecipes(response));
        dispatch(addDiets(responseDiets))

      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleOrder = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === 'order') {
      dispatch(order(value));
    } else if (name === 'orderByHealthscore') {
      dispatch(orderByHealthscore(value));
    }
  };

  return (
    <div className={styles.container}>
      <NavBar />

      <div className={styles.content}>
        <div className={styles.sideCards}>
          <Cards />
        </div>
        <aside className={styles.side}>
        SIDE ORDER FILTER
        <input  type="checkbox"
          name="checkbox3" />
        <input  type="checkbox"
          name="checkbox3" />
        <input  type="checkbox"
          name="checkbox3" />
        <input  type="checkbox"
          name="checkbox3" />
        <input  type="checkbox"
          name="checkbox3" />
        <input  type="checkbox"
          name="checkbox3" />
        <input  type="checkbox"
          name="checkbox3" />
        <input  type="checkbox"
          name="checkbox3" />
        <input  type="checkbox"
          name="checkbox3" />
        <input  type="checkbox"
          name="checkbox3" />
        </aside>
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
        <select name="orderByHealthscore" defaultValue="DEFAULT" onChange={handleOrder}>
        <option value="DEFAULT" disabled>
Ordenar por Healthscore        </option>
        <option value="A">Ascendente</option>
        <option value="D">Descendente</option>
      </select>
        </div>
      </div>

      <Footer />
    </div>
  );
}
