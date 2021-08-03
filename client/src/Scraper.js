import React, { useState, useEffect } from 'react';

function Scraper( { type } ) {

  const [data, setData] = React.useState(null);

  useEffect(async () => {
    console.log(type)
      await fetch("/" + type)
        .then((res) => res.json())
        .then((data) => setData(data.results));
    }, []);


  return(
      <div>
          <p>My name is: {data}</p>
      </div>
  )
}

export default Scraper