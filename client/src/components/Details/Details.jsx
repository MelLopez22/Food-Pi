import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Detail() {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  console.log("este es el id", id);

  useEffect(() => {
    const fetchRecipe = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/eb240114-4cc4-48cd-8f5b-caff4a222d5d`);
        const data = response.data;
console.log('este es el id recibido para la peticion')
        if (data.name) {
          setRecipe(data);
        } else {
          window.alert("No hay recetas con ese ID");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe(id);
  }, []);
console.log(typeof recipe.pasoAPaso)
  // console.log(recipe.pasoAPaso[0].steps, "este es el pasoapaso");
  //[{                         }]

  return (
    <div>
      <h1>{recipe.name}</h1>
    <p>{recipe.resumenDelPlato}</p>
      <p>{recipe.healthScore}</p>

          <p>Paso a paso: </p>
        {/* FUNCIONA PARA PASOS QUE VIENEN DE LA API */}
        PASO A PASO PARA LAS RECETAS QUE VIENEN DE BDD

      {/* <ul>
        {recipe.pasoAPaso[0].steps.map((step, index) => {
          return <li key={step.number}>
            Paso {step.number}: {step.step}
          </li>
        }
          
        )}
      </ul> */}

      {/* <p>{recipe.Diets}</p>
      <img src={recipe.image} alt={recipe.name} />

      <p>Summary: {recipe.summary}</p> */}
    </div>
  );
}

export default Detail;
