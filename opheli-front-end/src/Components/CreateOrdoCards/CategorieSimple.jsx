import React, { Component, useReducer, useState } from 'react';
import SoinCard from './SoinCard';

//pour Ordonnance Simple
function CategorieSimple({ handleNbUse, handleSoins }) {
    const [index, setIndex] = useState(1);
    const [Soins, setSoins] = useState([]);

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleDesc = (e) => {
        setName(e.target.value);
    };

    const addSoin = (e) => {
        Soins.push('Soin' + index);
        setIndex(index + 1);
    };

    const delSoin = (e) => {
        if (Soins.length > 0) {
            Soins.pop();
            setIndex(index - 1);
        }
    };

    function mouseOver(e) {
        e.target.style.color = '#5ccdc4a9';
        e.target.style.border = 'solid #5ccdc4a9 1px';
    }
    function mouseOut(e) {
        e.target.style.color = '#4a565a';
        e.target.style.border = 'solid #4a565a 1px';
    }

    return (
        <div className="create-ordo-categorie">
            <h1 className="create-ordo-categorie-title">Soins classiques</h1>
            <div className="create-ordo-categorie-use">
                <label>Nombre d'utilisations</label>
                <input type="number" placeholder="1" min={1} max={5} onChange={(e) => handleNbUse(e)} />
            </div>
            <div className="create-ordo-catgeorie-buttons">
                <button onClick={addSoin} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                    Ajouter
                </button>
                <button onClick={delSoin} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                    Supprimer
                </button>
            </div>
            {Soins.map((soin) => {
                return <SoinCard soin={soin} />;
            })}
        </div>
    );
}

export default CategorieSimple;
