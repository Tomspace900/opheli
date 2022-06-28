import React, { useState } from 'react';
import SoinCard from './SoinCard';

//pour Ordonnance bizone
function CategorieBizone({ handleNbUse }) {
    //const [, forceRerender] = useReducer(x => x + 1, 0);

    const [indexALD, setIndexALD] = useState(1);
    const [SoinsALD, setSoinsALD] = useState([]);

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
            <h1 className="create-ordo-categorie-title">Soins ALD</h1>
            <div className="create-ordo-categorie-use">
                <label>Nombre d'utilisations</label>
                <input type="number" placeholder="1" onChange={handleNbUse} />
            </div>
            <div className="create-ordo-catgeorie-buttons">
                <button onClick={addSoinALD} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                    Ajouter
                </button>
                <button onClick={delSoinALD} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                    Supprimer
                </button>
            </div>
            {SoinsALD.map((soin) => {
                return <SoinCard soin={soin} />;
            })}
        </div>
    );
}

export default CategorieBizone;
