import React, {Component, useReducer, useState} from 'react';

//pour Ordonnance d'exception
function CategorieException() {

    //const [, forceRerender] = useReducer(x => x + 1, 0);

    const [index, setIndex] = useState(1);
    const [Soins, setSoins] = useState([]);

    const addSoin = (e) => {
        Soins.push("Soin" + index);
        setIndex(index + 1);
        //forceRerender();
    }

    const delSoin = (e) => {
        if(Soins.length > 0) {
            Soins.pop();
            setIndex(index - 1);
            //forceRerender();
        }
    }

    return (
        <div className="ordoCategorie">
            <h1>Soins remboursables</h1>
            <label htmlFor="nbRenouv">Nombre de renouvellements: </label>
            <input type="number" id="nbRenouv" name="nbRenouv"/>
            <br />
            <button onClick={addSoin}> Ajouter soin</button>
            <button onClick={delSoin}>Supprimer soin</button>
            <div id="Soins">
                {Soins.map(soin => {
                        return(
                            <div id={soin}>
                                <h1>{soin}</h1>
                                <label htmlFor={"nom" + soin}>Nom du soin</label>
                                <input type="text" id={"nom" + soin} name={"nom" + soin}></input>
                                <label htmlFor={"desc" + soin}>Description du soin</label>
                                <input type="text" id={"desc" + soin} name={"desc" + soin}></input>
                                <br/>
                            </div>
                        );
                    }

                )}
            </div>
        </div>
    );

};

export default CategorieException;