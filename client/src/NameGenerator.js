import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Scraper from './Scraper'

function NameGenerator( { pokemon }) {
  const [currentType, setCurrentType] = useState(0);


  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon).then(res => {
      setCurrentType(res.data.types[0].type.name)
      getNickName()
    });
  });

  function getNickName(){
    console.log(currentType)
  }

  return (
    <div>
      {currentType != 0 && <Scraper type={currentType}></Scraper>}
    </div>
  );
}

export default NameGenerator;