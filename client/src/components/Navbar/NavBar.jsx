
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logoFood from "../../img/logos/food_mel.jpeg";

const NavBar = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
    console.log(modalVisible);
  };
  const closeModal = () => {
    setModalVisible(false);
    console.log(modalVisible);
  };

  return (
    <div className={styles.navbarContainer}>
    


    <div>
    <SearchBar />

    </div>

      <div className={styles.navbarRight}>
        <button className={styles.btn} onClick={handleOpenModal}>
          CREAR RECETA
        </button>
      </div>

      {modalVisible && <Modal oncloseModal={closeModal} />}
    </div>
  );
};

export default NavBar;
