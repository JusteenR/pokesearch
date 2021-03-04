import React, { useState } from 'react';
import axios from 'axios';

function PokemonList({ pokemonList }) {
    const [pic, setPic] = useState('')

    function PokemonProfile(p){
        console.log(p)
        axios.get("https://pokeapi.co/api/v2/pokemon/" + p.name).then(res => {
            setPic(res.data.sprites.front_default)
        })
    }

    function Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    console.log(pic)

    return (
        <div>
            {pokemonList.map((p, i) => (
                <div className="listItem" key={p.name} onClick={() => PokemonProfile(p)}>
                    {Capitalize(p.name)}
                </div>
            ))}
            <img src={pic}></img>
        </div>
      );
}

export default PokemonList
