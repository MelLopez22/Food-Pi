import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterName, reset } from "../../Redux/actions";
import "./SearchBar.css"; 

function SearchBar() {
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state);

  const [searchValue, setSearchValue] = useState(""); 

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchValue(value); 

    if (value.trim() === "") {
      dispatch(reset()); 
    } else {
      const filterByName = recipes.filter((e) => {
        return e.name.toLowerCase().includes(value.toLowerCase());
      });

      dispatch(filterName(filterByName));
    }
  };

  return (
    <div className="searchBar">
      <label htmlFor="search" className="searchLabel">
        Buscar por nombre 
      </label>
      <div className="searchWrapper">
        <input
          type="text"
          name="search"
          value={searchValue}
          onChange={handleSearch}
          className="searchInput"
        />
      
      </div>
    </div>
  );
}

export default SearchBar;
