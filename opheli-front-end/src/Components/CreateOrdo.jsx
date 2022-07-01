import React, { useState } from 'react';
import '../CSS/OrdoCards/CreateOrdo.css';
import Categorie from './CreateOrdoCards/Categorie';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function App({ idMedecin, role }) {
    const [idPatient, setIdPatient] = useState('');
    const [categorie, setCategorie] = useState('simple');
    const [date, setDate] = useState(Date());
    const [nbUseSimple, setNbUseSimple] = useState(1);
    const [nbUseALD, setNbUseALD] = useState(1);
    const [soinsSimples, setSoinsSimples] = useState([]);
    const [soinsALD, setSoinsALD] = useState([]);
    const [notes, setNotes] = useState('');
    const navigate = useNavigate();

    console.log(role)
    if (role  != 'medecin') {navigate('/Error')}

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

    function handleSubmit() {
        idMedecin = 12354698351;
        console.log(soinsALD);
        console.log(soinsSimples);
        console.log(date);
        // type, dateCreation, notes, idPrescripteur, idPatient
        // pour chaque catégorie: type, nbRenouv
        switch (categorie) {
            case 'bizone':
                axios.post('http://localhost:8080/createOrdonnance', {
                    idPatient: idPatient,
                    idPrescripteur: idMedecin,
                    dateCreation: date,
                    type: categorie,
                    nbRenouvTotalALD: nbUseALD,
                    soinsALD: soinsALD,
                    nbRenouvTotal: nbUseSimple,
                    soinsSimples: soinsSimples,
                    notes: notes,
                });
                break;

            default:
                axios
                    .post('http://localhost:8080/createOrdonnance', {
                        idPatient: idPatient,
                        idPrescripteur: idMedecin,
                        dateCreation: date,
                        type: categorie,
                        nbRenouvTotal: nbUseSimple,
                        soinsSimples: soinsSimples,
                        notes: notes,
                    })
                    .then((r) => {
                        console.log(r);
                    });
                break;
        }
    }
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
                        {/* <option value="exception"> Médicaments d'exception </option> */}
                    </select>
                </div>
            </div>
            {(() => {
                switch (categorie) {
                    case 'bizone':
                        return (
                            <>
                                <Categorie title={'ALD'} soins={soinsALD} setSoins={setSoinsALD} handleNbUse={handleNbUseALD} />
                                <Categorie
                                    title={'simples'}
                                    soins={soinsSimples}
                                    setSoins={setSoinsSimples}
                                    handleNbUse={handleNbUseSimple}
                                />
                            </>
                        );
                    // case 'exception':
                    //     return (
                    //         <Categorie
                    //             soins={soinsSimples}
                    //             setSoins={setSoinsSimples}
                    //             handleNbUse={handleNbUseSimple}
                    //             handleSoins={handleSoinsSimples}
                    //         />
                    //     );
                    default:
                        return (
                            <Categorie
                                title={'simples'}
                                soins={soinsSimples}
                                setSoins={setSoinsSimples}
                                handleNbUse={handleNbUseSimple}
                            />
                        );
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
