import React, { Component, useReducer, useState } from 'react';
import SoinCard from './SoinCard';

//pour Ordonnance bizone
function CategorieBizone() {
    //const [, forceRerender] = useReducer(x => x + 1, 0);

    const [categorie, setCategorie] = useState('simple');

    const [indexALD, setIndexALD] = useState(1);
    const [index, setIndex] = useState(1);
    const [SoinsALD, setSoinsALD] = useState([]);
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

    const addSoinALD = (e) => {
        SoinsALD.push('SoinALD' + indexALD);
        setIndexALD(indexALD + 1);
        //forceRerender();
    };

    const delSoinALD = (e) => {
        if (SoinsALD.length > 0) {
            SoinsALD.pop();
            setIndexALD(indexALD - 1);
            //forceRerender();
        }
    };

    return (
        <div className="ordoCategorie">
            <div>
                <h1>Soins en rapport avec une ALD (Affectation de Longue Durée)</h1>
                <label htmlFor="nbUtilisationALD">Nombre d'utilisations: </label>
                <input type="number" id="nbUtilisationALD" name="nbUtilisationALD" />
                <br />
                <button onClick={addSoinALD}>Ajouter un soin</button>
                <button onClick={delSoinALD}>Supprimer un soin</button>
                <div id="Soins">
                    {SoinsALD.map((soin) => {
                        return <SoinCard soin={soin} />;
                    })}
                </div>
            </div>
            <br />
            <div>
                <h1>Soins classiques</h1>
                <label htmlFor="nbUtilisation">Nombre d'utilisations: </label>
                <input type="number" id="nbUtilisation" name="nbUtilisation" />
                <br />
                <button onClick={addSoin}>Ajouter un soin</button>
                <button onClick={delSoin}>Supprimer un soin</button>
                <div id="Soins">
                    {Soins.map((soin) => {
                        return <SoinCard soin={soin} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default CategorieBizone;
