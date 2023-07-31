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
  const [stepsArray, setStepsArray] = useState([]); 
  // Estado local para el array de pasos
  //stepsarray es lo q voy a enviar a back 
  const [dietsArr, setDietsArr] = useState([]); 


  const handleAgregarDiets = (event) => {
    const { value } = event.target;
    setDietsArr((prevDietsArr) => {
      if (!prevDietsArr.includes(value)) {
        // Si el valor aún no está en el array, agrégalo
        return [...prevDietsArr, value];
      } else {
        // Si el valor ya está en el array, quítalo
        return prevDietsArr.filter((item) => item !== value);
      }
    });
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
    //preguntar si name es pasoapaso , si es captar el valor, y setearlo a newstep
    if(name === 'pasoAPaso'){
        setNewStep(e.target.value); // Actualiza el estado local con el texto ingresado en el textarea

    }else if(name === 'diets'){
        setData({
            ...data,
            diets: [...diets, ...dietsArr],
          });
    }
    else{
        //en el caso de diets , seria traer toda la data y en la propiedad name = diets que ahora valga el nuevo array de numeros ids 
          setData({
      ...data,
      [name]: value,
    });
    }
  
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3001/recipes", data);
  
      alert("Receta creada exitosamente:", response.data);
      window.location.reload();
  
      // Cierra el modal después de postear la receta exitosamente
      oncloseModal();
    } catch (error) {
      // Si hay algún error en la solicitud, puedes manejarlo aquí
      console.error("Error al crear la receta:", error);
    }
  };
  

  return (
    console.log('TODO LO Q HAY EN DATA QUE SE VA A ENVIAR A M BACK', data),
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
              <form onSubmit={handleSubmit}>
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
  {diets.map((name, index) => (
    <div key={name}>
      <input
        type="checkbox"
        id={index + 1}
        name={'diets'}
        value={index + 1}
        onChange={handleAgregarDiets}
        checked={dietsArr.includes(String(index + 1))}
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
                onChange={handleChange}
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
