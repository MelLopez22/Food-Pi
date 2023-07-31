import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterName } from "../../Redux/actions";

function SearchBar() {
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state);
console.log(recipes)
  const [searchValue, setSearchValue] = useState(""); // Estado local para mantener el valor del input

  const handleSearch = (event) => {
    const { value } = event.target;
    console.log(value)
    setSearchValue(value); // Actualiza el estado local con el valor del input

    const filterByName = recipes.filter((e) => {
      return e.name.toLowerCase().includes(value.toLowerCase());
    });

    console.log(filterByName, 'filterbyname')
    console.log(recipes, 'recipes')

    // Enviamos el array filtrado para modificar el estado de recetas en Redux
    dispatch(filterName(filterByName));
  };

  return (
    console.log('esto es searchvalue', searchValue),
    <div>
      <label htmlFor="">BUSCAR RECETAS POR NOMBRE</label>
      <input type="text" name="search" value={searchValue} onChange={handleSearch} />
    </div>
  );
}

export default SearchBar;
