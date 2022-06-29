import React, { useState } from 'react';
import '../CSS/OrdoCards/CreateOrdo.css';
import CategorieSimple from './CreateOrdoCards/CategorieSimple';
import CategorieALD from './CreateOrdoCards/CategorieALD';
import CategorieException from './CreateOrdoCards/CategorieException';

function App() {
    const [idPatient, setIdPatient] = useState('');
    const [categorie, setCategorie] = useState('simple');
    const [nbUseSimple, setNbUseSimple] = useState(1);
    const [nbUseALD, setNbUseALD] = useState(1);
    const [notes, setNotes] = useState('');
    const [soinsSimples, setSoinsSimples] = useState([]);
    const [soinsALD, setSoinsALD] = useState([]);

    const handleIdPatient = (e) => {
        setIdPatient(e.target.value);
        console.log(e.target.value);
    };

    const handleChangeCategorie = (e) => {
        setCategorie(e.target.value);
        console.log(e.target.value);
    };

    const handleNbUseSimple = (e) => {
        setNbUseSimple(e.target.value);
        console.log('simple' + e.target.value);
    };

    const handleNbUseALD = (e) => {
        setNbUseALD(e.target.value);
        console.log('ALD' + e.target.value);
    };

    const handleSoinsSimples = (e) => {
        setSoinsSimples(e.target.value);
    };

    const handleSoinsALD = (e) => {
        setSoinsALD(e.target.value);
    };

    const handleNotes = (e) => {
        setNotes(e.target.value);
        console.log(e.target.value);
    };

    function mouseOver(e) {
        e.target.style.color = '#5ccdc4a9';
        e.target.style.border = 'solid #5ccdc4a9 1px';
    }
    function mouseOut(e) {
        e.target.style.color = '#4a565a';
        e.target.style.border = 'solid #4a565a 1px';
    }

    function handleSubmit() {}

    return (
        <div className="create-ordo">
            <h1 className="create-ordo-title">Délivrer une ordonnance</h1>
            <div className="create-ordo-secu">
                <div>
                    <label>Numéro de sécurité sociale du patient</label>
                </div>
                <div>
                    <input type="text" placeholder="1234567890123" onChange={(e) => handleIdPatient(e)} />
                </div>
            </div>
            <div className="create-ordo-categorie-select">
                <div className="create-ordo-categorie-select-title">
                    <label>Type de l'ordonannce</label>
                </div>
                <div className="create-ordo-categorie-select-input">
                    <select onChange={(e) => handleChangeCategorie(e)}>
                        <option value="simple"> Simple </option>
                        <option value="bizone"> Bi-zone </option>
                        <option value="exception"> Médicaments d'exception </option>
                    </select>
                </div>
            </div>
            {(() => {
                switch (categorie) {
                    case 'bizone':
                        return (
                            <>
                                <CategorieALD handleNbUse={handleNbUseALD} handleSoins={handleSoinsALD} />
                                <CategorieALD handleNbUse={handleNbUseSimple} handleSoins={handleSoinsSimples} />
                            </>
                        );
                    case 'exception':
                        return <CategorieException />;
                    default:
                        return <CategorieALD handleNbUse={handleNbUseSimple} handleSoins={handleSoinsSimples} />;
                }
            })()}
            <div className="create-ordo-notes">
                <textarea type="text" placeholder="Notes" onChange={handleNotes} />
            </div>
            <button className="" onMouseEnter={mouseOver} onMouseLeave={mouseOut} onClick={handleSubmit}>
                Valider
            </button>
        </div>
    );
}

export default App;
