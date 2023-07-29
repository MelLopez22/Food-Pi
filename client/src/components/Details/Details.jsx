import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Details.css"
function Detail() {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  console.log("este es el id", id);

  useEffect(() => {
    const fetchRecipe = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${id}`);
        const data = response.data;
        console.log("este es el id recibido para la peticion");
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
  console.log(recipe);
 

  return (
    <div className='detailContainer'>
        <h1>NAME {recipe.name}</h1>
      <div className="div-columns">
                {/* Columna Izquierda */}
                <div className='leftColumn'>
                {/* Utilizar dangerouslySetInnerHTML para renderizar el contenido HTML */}
                <p dangerouslySetInnerHTML={{ __html: recipe.resumenDelPlato }} />
                <p>HEALTHSCORE {recipe.healthScore}</p>
                <p>{/* Aquí puedes mostrar las dietas */}</p>
                </div>

                {/* Columna Derecha */}
                <div className='rightColumn'>
                  <img src={recipe.image} alt={recipe.name} />
                </div>
        </div>
    

      {/* Paso a Paso */}
      <div className={'bottomRow'}>
        <p>Paso a paso: </p>
        <ul>
          {recipe.pasoAPaso?.map((step, index) => (
            <li key={index}>
              {step.number} : {step.step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Detail;
