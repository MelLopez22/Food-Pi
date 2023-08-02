import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterName, reset } from "../../Redux/actions";
import "./SearchBar.css"; // Asegúrate de importar tu archivo de estilos CSS

function SearchBar() {
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state);

  const [searchValue, setSearchValue] = useState(""); // Estado local para mantener el valor del input

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchValue(value); // Actualiza el estado local con el valor del input

    if (value.trim() === "") {
      // Si el valor del input está vacío o contiene solo espacios en blanco
      dispatch(reset()); // Despacha la acción reset para mostrar todas las recetas
    } else {
      const filterByName = recipes.filter((e) => {
        return e.name.toLowerCase().includes(value.toLowerCase());
      });

      // Enviamos el array filtrado para modificar el estado de recetas en Redux
      dispatch(filterName(filterByName));
    }
  };

  return (
    <div className="SearchBar">
      <label htmlFor="">BUSCAR RECETAS POR NOMBRE</label>
      <input type="text" name="search" value={searchValue} onChange={handleSearch} />
    </div>
  );
}

export default SearchBar;
