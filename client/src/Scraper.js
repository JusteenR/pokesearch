import React, { useState, useEffect } from 'react';

function Scraper( { type, name } ) {

  const [data, setData] = React.useState(null);

  useEffect(async () => {
    console.log(type)
      await fetch("/synonyms?pokemonType="+type+'&pokemonName='+name)
        .then((res) => res.json())
        .then((data) => setData(data.results));
    }, []);


  return(
      <div>
          <p>You can call me {data}</p>
      </div>
  )
}

export default Scraper