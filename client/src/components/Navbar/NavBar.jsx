import Modal from '../Modal/Modal';
import SearchBar from '../SearchBar/SearchBar'
import { useState } from "react";

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
    <div>
      <h1>
          ESTO ES EL NAVBAR EN CONSTRUCCION
        LOGO 
      </h1>
  
        <SearchBar/>
        <button onClick={handleOpenModal}>CREAR RECETA</button>
          {/* Renderizar el modal si modalVisible es true */}
      {modalVisible && <Modal oncloseModal = {closeModal}/>}
    </div>
  )
}
