// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

import NavBar from "../Navbar/NavBar";
import Cards from '../Cards/Cards'
import Paginate from "../Paginate/Paginate";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addRecipes } from "../../Redux/actions";

// import styles from "./Home.module.css";

export default function Homepage() {

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await axios.get('http://localhost:3001/recipes')).data;
        
        dispatch(addRecipes(response));
        
        console.log(response);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    
    fetchData();
  }, []);  


  return (
    <div>
    HOMEPAGE
    <NavBar/>
    <Cards/>
    <Paginate/>
    sideorderfilter????????????
    <Footer/>
    </div>
 
  )
}
