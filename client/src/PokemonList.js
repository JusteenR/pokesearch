import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import NameGenerator from './NameGenerator'
import Modal from 'react-bootstrap/Modal';

function PokemonList({ pokemonList }) {
    const [pic, setPic] = useState([])
    const [profile, setProfile] = useState(false)

    const handleClose = () => setProfile(false);

    async function PokemonProfile(p){
        await axios.get("https://pokeapi.co/api/v2/pokemon/" + p.name).then(res => {
            setPic({"name": p.name, "url": res.data.sprites.front_default})
        })
        setProfile(true)
    }


    function Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div>
                {pokemonList.map((p, i) => (
                    <div className="listItem" id={p.name}>
                        <Button variant="outline-info" key={p.name} onClick={() => PokemonProfile(p)}>
                            {Capitalize(p.name)}
                        </Button>
                    </div>
                ))}
                <Modal show={profile} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{pic.name && Capitalize(pic.name)}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={pic.url}></img>
                        <NameGenerator pokemon={pic.name}></NameGenerator>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
        </div>
      );
}

export default PokemonList
