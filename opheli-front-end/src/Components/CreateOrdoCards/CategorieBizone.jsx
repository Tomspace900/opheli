import React, {Component, useReducer, useState} from 'react';

//pour Ordonnance bizone
function CategorieBizone() {

    const [, forceRerender] = useReducer(x => x + 1, 0);

    const [indexALD, setIndexALD] = useState(1);
    const [index, setIndex] = useState(1);
    const [SoinsALD, setSoinsALD] = useState([]);
    const [Soins, setSoins] = useState([]);

    const addSoin = (e) => {
        Soins.push("Soin" + index);
        setIndex(index + 1);
        forceRerender();
    }

    const delSoin = (e) => {
        if(Soins.length > 0) {
            Soins.pop();
            setIndex(index - 1);
            forceRerender();
        }
    }

    const addSoinALD = (e) => {
        SoinsALD.push("Soin" + indexALD);
        setIndexALD(indexALD + 1);
        forceRerender();
    }

    const delSoinALD = (e) => {
        if(SoinsALD.length > 0) {
            SoinsALD.pop();
            setIndexALD(indexALD - 1);
            forceRerender();
        }
    }

    return (
        <div className="ordoCategorie">
            <div>
                <h1>Soins en rapport avec une ALD (Affectation de Longue Durée)</h1>
                <label htmlFor="nbUtilisationALD">Nombre d'utilisations: </label>
                <input type="number" id="nbUtilisationALD" name="nbUtilisationALD"/>
                <br />
                <button onClick={addSoinALD}> Ajouter soin</button>
                <button onClick={delSoinALD}>Supprimer soin</button>
                <div id="Soins">
                    {SoinsALD.map(soin => {
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
            <br/>
            <div>
                <h1>Soins classiques</h1>
                <label htmlFor="nbUtilisation">Nombre d'utilisations: </label>
                <input type="number" id="nbUtilisation" name="nbUtilisation"/>
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
        </div>
    );

};

export default CategorieBizone;