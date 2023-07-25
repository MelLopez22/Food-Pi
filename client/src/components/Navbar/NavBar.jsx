import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Cards from '../Cards/Cards'

export default function NavBar(){
  return (
    <div>
        estamos en el navbar
        LOGO 
        <SearchBar/>
        <button>CREAR RECETA</button>
        <Cards/>
    </div>
  )
}
