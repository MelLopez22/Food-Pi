import Modal from '../Modal/Modal';
import SearchBar from '../SearchBar/SearchBar'
import { useState } from "react";
import styles from "./NavBar.module.css";


export default function NavBar(){
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
    console.log(modalVisible)
  };
  const closeModal = () => {
    setModalVisible(false);
    console.log(modalVisible)
  };
  return (
    <div className={styles.navbarContainer}>
     <img src="/" alt="LOGO" />
  
        <SearchBar/>
        <button onClick={handleOpenModal}>CREAR RECETA</button>
          {/* Renderizar el modal si modalVisible es true */}
      {modalVisible && <Modal oncloseModal = {closeModal}/>}
    </div>
  )
}
