import React, { Component, useReducer, useState } from 'react';
import SoinCard from './SoinCard';

//pour Ordonnance Simple
function CategorieSimple() {
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

    return (
        <div className="ordoCategorie">
            <h1>Soins classiques</h1>
            <label htmlFor="nbRenouv">Nombre d'utilisations: </label>
            <input type="number" id="nbRenouv" name="nbRenouv" />
            <br />
            <button onClick={addSoin}>Ajouter un soin : </button>
            <button onClick={delSoin}>Supprimer un soin: </button>
            <div id="Soins">
                {Soins.map((soin) => {
                    return <SoinCard soin={soin} />;
                })}
            </div>
        </div>
    );
}

export default CategorieSimple;
