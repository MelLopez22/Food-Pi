import { useDispatch } from "react-redux";
import { filterByDiets } from "../../Redux/actions";


// a medida que vaya escribiendo en el input quiero que se vaya ejecutando a action de ir filtrando y renderizando mis recetas 

function SearchBar() {
  const dispatch = useDispatch()
  const handleSearch = (event)=>{
  const {value} = event.target;
  console.log(value)
  dispatch(filterByDiets(value))
  }
  return (
    <div>SearchBar
      <label htmlFor="">Buscar</label>
      <input type="text" name="search" value='search' onChange={handleSearch}/>
      <button></button>
    </div>
  )
}

export default SearchBar