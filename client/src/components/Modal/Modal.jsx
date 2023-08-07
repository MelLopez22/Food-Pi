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
  const [errors, setErrors] = useState({});

  const [newStep, setNewStep] = useState("");
  const [stepsArray, setStepsArray] = useState([]);

  const [dietsArr, setDietsArr] = useState([]);
  const initialErrors = {
    name: "Este campo debe llenarse",
    healthScore: "Este campo debe llenarse",
    diets: "Debe seleccionar al menos una dieta",
    pasoAPaso: "Debe colocar al menos un paso",
  };

  const handleAgregarDiets = (event) => {
    const { name, value, checked } = event.target;

    if (checked) {
      setDietsArr((prevDietsArr) => {
        if (!prevDietsArr.includes(value)) {
          setData((prevData) => ({
            ...prevData,
            diets: [...prevDietsArr, value],
          }));
          return [...prevDietsArr, value];
        }
        return prevDietsArr;
      });
    } else {
      setDietsArr((prevDietsArr) =>
        prevDietsArr.filter((item) => item !== value)
      );
    }
  };

  const handleAgregar = () => {
    if (newStep.trim() !== "") {
      setStepsArray([...stepsArray, { step: newStep }]);
      setNewStep("");
      setData((prevData) => ({
        ...prevData,
        pasoAPaso: [...stepsArray, { step: newStep }],
      }));
    }
  };

  const validate = () => {
    const errors = {};

    if (!data.name) {
      errors.name = "Este campo debe llenarse";
    }
    if (typeof data.name !== "string") {
      errors.name = "Este campo solo admite letras";
    }

    if (!data.healthScore) {
      errors.healthScore = "este campo debe llenarse";
    }
    if (!/^\d+$/.test(data.healthScore)) {
      errors.healthScore = "solo admite numeros";
    }

    if (dietsArr.length === 0) {
      errors.diets = "debe seleccionar al menos una dieta";
    }

    if (stepsArray.length === 0) {
      errors.pasoAPaso = "debe colocar a menos un paso";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pasoAPaso") {
      setNewStep(value);
    } else if (name === "diets") {
      setData((prevData) => ({
        ...prevData,
        diets: [...diets, ...dietsArr],
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setErrors(validate()); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:3001/recipes",
          data
        );
        alert("Receta creada exitosamente:", response.data);
        window.location.reload();
        oncloseModal();
      } catch (error) {
        console.error("Error al crear la receta:", error);
      }
    }
  };

  return (
   
    (
      <div className="modal-container">
        <div className="modal-background" onClick={oncloseModal}></div>
        <div className="modal-content-container">
          <div className="modal-content">
            <div className="close-title-content">
              <button className="modal-close" onClick={oncloseModal}>
                X
              </button>
              <h1>POSTEAR RECETAS</h1>
            </div>

            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="data-container">
                    <div className="input-group">
                      <label htmlFor="">Name</label>
                      <input
                        type="text"
                        value={data.name}
                        name="name"
                        onChange={handleChange}
                      />
                      <p>{errors.name}</p>
                    </div>
                    <div className="input-group">
                      <label htmlFor="">Descripcion del plato</label>
                      <input
                        type="text"
                        value={data.resumenDelPlato}
                        name="resumenDelPlato"
                        onChange={handleChange}
                      />
                      <p>{errors.resumenDelPlato}</p>
                    </div>
                    <div className="input-group">
                      <label htmlFor="">
                        Healthscore - Nivel de comida saludable
                      </label>
                      <input
                        type="text"
                        value={data.healthScore}
                        name="healthScore"
                        onChange={handleChange}
                      />
                      <p>{errors.healthScore}</p>
                    </div>
                    <div className="input-group">
                      <label htmlFor="">Imagen</label>
                      <input
                        type="text"
                        value={data.image}
                        name="image"
                        onChange={handleChange}
                      />
                      <p>{errors.image}</p>
                    </div>
                  </div>
                  <div className="diets-container">
                    <p>Tipos de dietas</p>
                    {diets.map((name, index) => (
                      <div key={name}>
                        <input
                          type="checkbox"
                          id={index + 1}
                          name={name}
                          value={index + 1}
                          onChange={handleAgregarDiets}
                          checked={dietsArr.includes(String(index + 1))}
                        />

                        <label htmlFor={name}>{name}</label>
                      </div>
                    ))}
                    <p>{errors.diets}</p>
                  </div>
                </div>
                <div className="textarea-container">
                  <div className="steps-container">
                    <h3>PASO A PASO</h3>

                    <textarea
                      name="pasoAPaso"
                      id="pasoAPaso"
                      cols="30"
                      rows="3"
                      placeholder="Escribe el siguiente paso ..."
                      onChange={handleChange}
                      value={newStep}
                    ></textarea>
                    <p>{errors.pasoAPaso}</p>

                    <button type="button" onClick={handleAgregar}>
                      AGREGAR
                    </button>
                  </div>

                  <ul className="ul-content">
                    {stepsArray.map((step, index) => {
                      console.log(stepsArray, "soy el array dentro del mapeo");
                      let numStep = index + 1; 
                      return (
                        <li className="li-content" key={numStep}>
                          {numStep}: {step.step}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="modal-buttons">
          
                    <button type="submit" onClick={handleSubmit}>
                      Aceptar
                    </button>
                
                  <button onClick={oncloseModal}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Modal;
