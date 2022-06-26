import React, { Component, useReducer, useState } from 'react';
import SoinCard from './SoinCard';

//pour Ordonnance d'exception
function CategorieException() {
    //const [, forceRerender] = useReducer(x => x + 1, 0);

    const [index, setIndex] = useState(1);
    const [Soins, setSoins] = useState([]);

    const addSoin = (e) => {
        Soins.push('Soin' + index);
        setIndex(index + 1);
        //forceRerender();
    };

    const delSoin = (e) => {
        if (Soins.length > 0) {
            Soins.pop();
            setIndex(index - 1);
            //forceRerender();
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
            <h1 className="create-ordo-categorie-title">Soins exceptionnels</h1>
            <div className="create-ordo-categorie-use">
                <label>Nombre d'utilisations</label>
                <input type="number" placeholder="0" />
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

export default CategorieException;
