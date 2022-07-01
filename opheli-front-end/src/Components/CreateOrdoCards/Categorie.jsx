import React, { useState } from 'react';
import SoinCard from './SoinCard';

//pour Ordonnance bizone
function CategorieBizone({ title, handleNbUse, soins, setSoins }) {
    function addSoin() {
        setSoins([...soins, { name: '', desc: '' }]);
        console.log(soins);
    }

    const delSoin = () => {
        if (soins.length > 0) {
            soins.pop();
        }
        console.log(soins);
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
            <h1 className="create-ordo-categorie-title">Soins {title}</h1>
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
            {soins &&
                soins.map((soin, index) => {
                    return <SoinCard soin={soin} key={index} />;
                })}
        </div>
    );
}

export default CategorieBizone;
