import React, { useState } from 'react';
import '../CSS/List.css';
import '../CSS/Login.css';
import Axios from "axios";
import {useNavigate} from "react-router-dom";

function ListeClients() {
    const [ask, setAsked] = useState(false);
    const [liste, setListe] = useState([]);
    const [access, setAccess] = useState('start');
    const navigate = useNavigate();

    function suppClient(id) {
        Axios.post('http://localhost:8080/suppClient',{idClient : id}).then(response => {
            console.log(response)
            listeClients()
        });
    }

    if (ask == false) {
        listeClients()
    }

    function listeClients() {
        console.log("appel")
        Axios.get('http://localhost:8080/listeClients',{code:'liste'}).then(response => {
            setListe(response.data)
            setAsked(true)
            console.log("update")
        });
    }

    if (access == 'start') {
        Axios.post('http://localhost:8080/check',{code:'listeClients'}).then(response => {
            setAccess(response.data)
        });
    }
    if (access == false) {
        navigate('/Error')
    }

    return (
        <div>
            <div className="login">
                <span className="login-title">Liste des clients de votre mutuelle</span>
            </div>
            <div className="page">
                <table className="liste">
                    <thead>
                        <tr>
                            <td>Nom</td>
                            <td>Prénom</td>
                            <td>Mail</td>
                            <td>Supprimer le client</td>
                        </tr>
                    </thead>
                    <tbody>
                        {liste.map(item => {
                            return (
                                <tr>
                                    <td>{item.Nom}</td>
                                    <td>{item.Prenom}</td>
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