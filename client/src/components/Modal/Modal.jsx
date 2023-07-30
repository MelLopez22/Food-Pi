import { useState } from "react";
import "./Modal.css";
import axios from 'axios'

function Modal({ oncloseModal }) {
    const [data, setData] = useState({
        name: '',
        healthScore : null,
        image : '',
        diets: [],
        resumenDelPlato: '',
        pasoAPaso: []

    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Aquí realizamos la solicitud HTTP POST al backend
          const response = await axios.post("http://localhost:3001/recipes", data);
    
          // Si la solicitud fue exitosa, puedes realizar alguna acción en consecuencia
          alert("Receta creada exitosamente:", response.data);
          
          // Cierra el modal después de postear la receta exitosamente
          oncloseModal();
        } catch (error) {
          // Si hay algún error en la solicitud, puedes manejarlo aquí
          console.error("Error al crear la receta:", error);
        }
      };
    
   return (
    <div className="modal-container">
      <div className="modal-background" onClick={oncloseModal}></div>
      <div className="modal-content-container">
        <div className="modal-content">
          <div>
            <button className="modal-close" onClick={oncloseModal}>
              X
            </button>
            <h1>FORMULARIO PARA POSTEAR RECETAS</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="">NAME</label>
              <input type="text"  value={data.name} name="name" onChange={handleChange}/>

              <label htmlFor="">RESUMEN DEL PLATO</label>
              <input type="text"  value={data.resumenDelPlato} name="resumenDelPlato" onChange={handleChange}/>

              <label htmlFor="">HEALTHSCORE</label>
              <input type="text" value={data.healthScore} name="healthScore" onChange={handleChange} />

              <label htmlFor="">PASO A PASO</label>
              <input type="text"  value={data.pasoAPaso} name="pasoAPaso" onChange={handleChange}/>

              <label htmlFor="">IMAGE</label>
              <input type="text" value={data.image} name="image" onChange={handleChange} />

              <label htmlFor="">DIETS</label>
              <input type="text" value={data.diets} name="diets" onChange={handleChange} />

                <div className="modal-buttons">
            <button onClick={oncloseModal}>Cancelar</button>
            <button type="submit">Aceptar</button>
          </div>
            </form>
          </div>

        
        </div>
      </div>
    </div>
  );
    }
    
    
    
    
    
    

// }

export default Modal;
