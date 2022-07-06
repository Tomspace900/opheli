import React, { useState } from 'react';
import '../../CSS/List.css';
import '../../CSS/Login.css';
import Axios from "axios";
import {useNavigate} from "react-router-dom";

function ListeClients({role}) {
    const [ask, setAsked] = useState(false);
    const [liste, setListe] = useState([]);;
    const navigate = useNavigate();

    if (role  != 'mutuelle') {navigate('/Error')}

    function suppClient(id) {
        Axios.post('http://localhost:8080/suppClient',{idClient : id})
        listeClients()
    }

    if (ask == false) {
        listeClients()
    }

    function listeClients() {
        Axios.get('http://localhost:8080/listeClients',{code:'liste'}).then(response => {
            setListe(response.data)
            setAsked(true)
        });
    }

    return (
        <div>
            <div className="login">
                <span className="login-title">Liste des clients de votre mutuelle</span>
            </div>
            <div className="page">
                <table className="liste">
                    <thead>
                        <tr className="tr">
                            <td>Nom</td>
                            <td>Prénom</td>
                            <td>Mail</td>
                            <td>Supprimer le client</td>
                        </tr>
                    </thead>
                    <tbody>
                        {liste.map(item => {
                            return (
                                <tr className="tr">
                                    <td>{item.NomUtilisateur}</td>
                                    <td>{item.PrenomUtilisateur}</td>
                                    <td>{item.Mail}</td>
                                    <td><button onClick={() => suppClient(item.IdPatient)}>Supprimer</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListeClients;