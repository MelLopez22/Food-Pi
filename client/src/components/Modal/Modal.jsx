import { useState } from "react";
import "./Modal.css";
import axios from "axios";
import { useSelector } from "react-redux";

function Modal({ oncloseModal }) {
  const { diets } = useSelector((state) => state);

  const [data, setData] = useState({
    name: "",
    healthScore: 0,
    image: "",
    diets: [],
    resumenDelPlato: "",
    pasoAPaso: [],
  });

 
  const [newStep, setNewStep] = useState(""); 
  const [stepsArray, setStepsArray] = useState([]); // Estado local para el array de pasos
  //stepsarray es lo q voy a enviar a back 

  const handleChangeSteps = (e) => {
    setNewStep(e.target.value); // Actualiza el estado local con el texto ingresado en el textarea
  };

  const handleAgregar = () => {
    if (newStep.trim() !== "") {
      setStepsArray([...stepsArray, { step: newStep }]);
      setNewStep("");
      setData(prevData => ({
        ...prevData,
        pasoAPaso: [...stepsArray, { step: newStep }]
      }));
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log(data);
  };
  // (prevData) => ({
  //   ...prevData,
  //   [name]: value,
  // })

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       // Aquí realizamos la solicitud HTTP POST al backend
  //       const response = await axios.post("http://localhost:3001/recipes", data);

  //       // Si la solicitud fue exitosa, puedes realizar alguna acción en consecuencia
  //       alert("Receta creada exitosamente:", response.data);

  //       // Cierra el modal después de postear la receta exitosamente
  //       oncloseModal();
  //     } catch (error) {
  //       // Si hay algún error en la solicitud, puedes manejarlo aquí
  //       console.error("Error al crear la receta:", error);
  //     }
  //   };

  return (
    console.log('soy el paso a paso de data', data.pasoAPaso),
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
          <div className="form-container">
            <form>
              {/* <form onSubmit={handleSubmit}> */}
              <div className="form-row">
                <div className="data-container">
                  <div className="input-group">
                    <label htmlFor="">NAME</label>
                    <input
                      type="text"
                      value={data.name}
                      name="name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">RESUMEN DEL PLATO</label>
                    <input
                      type="text"
                      value={data.resumenDelPlato}
                      name="resumenDelPlato"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">HEALTHSCORE</label>
                    <input
                      type="text"
                      value={data.healthScore}
                      name="healthScore"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="">IMAGE</label>
                    <input
                      type="text"
                      value={data.image}
                      name="image"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="diets-container">
                  {diets.map((name) => (
                    <div key={name}>
                      <input
                        type="checkbox"
                        id={name}
                        name={name}
                        value={name}
                        onChange={() => {}}
                      />
                      <label htmlFor={name}>{name}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-buttons">
                <button onClick={oncloseModal}>Cancelar</button>
                <button type="submit">Aceptar</button>
              </div>
            </form>
            <div className="textarea-container">
              <h3>PASO A PASO</h3>
              <textarea
                name="pasoAPaso"
                id="pasoAPaso"
                cols="30"
                rows="10"
                placeholder="Escribe el siguiente paso ..."
                onChange={handleChangeSteps}
                value={newStep}
              ></textarea>
  <ul>
                {stepsArray.map((step, index) => {
                    console.log(stepsArray, 'soy el array dentro del mapeo')
                  let numStep = index + 1; // Calcula el número del paso sumando 1 al índice
                  return (
                    <li key={numStep}>
                      {numStep}: {step.step}
                    </li>
                  );
                })}
              </ul>
              <button onClick={handleAgregar}>AGREGAR</button>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
