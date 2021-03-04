import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import PokemonList from './PokemonList';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [pokemonFiltered, setPokemonFiltered] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    async function fetchData() {
      await axios.get("https://pokeapi.co/api/v2/pokemon?limit=2000").then(res => {
        setPokemon(res.data.results.map(p => {
          var obj = {'name':p.name, 'url': "https://pokeapi.co/api/v2/pokemon/"+p.name}
          return obj
        }))
      })
    }
    fetchData()
  }, [])

  const updateInput = (e) => {
    const filtered = pokemon.filter(p => {
     return p.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    })
    setInput(e.target.value.data);
    setPokemonFiltered(filtered);
  }

  return (
    <div>
      <input type='text' value={input} onChange={updateInput} placeholder="search for pokemon"/>
      <PokemonList pokemonList={pokemonFiltered}/>
    </div>
  );
}

export default App;
