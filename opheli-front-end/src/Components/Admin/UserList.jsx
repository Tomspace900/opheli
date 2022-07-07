import React, {useState} from 'react';
import '../../CSS/List.css';
import '../../CSS/Login.css';
import {useNavigate} from "react-router-dom";
import Axios from "axios";

function UserList({role}) {
    const [ask, setAsked] = useState(false);
    const [listeClient, setListeClient] = useState([]);
    const [listePresc, setListePresc] = useState([]);
    const [listePharma, setListePharma] = useState([]);
    const [listeMutuelle, setListeMutuelle] = useState([]);
    const [mail, setMail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [date, setDate] = useState(Date());

    if (role !== 'admin') {
        navigate('/Error')
    }

    if (ask == false) {
        listeUsers();
    }

    function listeUsers() {
        Axios.get('http://localhost:8080/listePatients').then(response => {
            setListeClient(response.data);
            Axios.get('http://localhost:8080/listePresc').then(response => {
                setListePresc(response.data);
                Axios.get('http://localhost:8080/listePharma').then(response => {
                    setListePharma(response.data);
                    Axios.get('http://localhost:8080/listeMutuelle').then(response => {
                        setListeMutuelle(response.data);
                        setAsked(true);
                    });
                });
            });
        });
    }

    const handleMail = (e) => {
        setMail(e.target.value)
    }

    const createCode = () => {
        if (mail == '') {
            setError("Tous les champs sont obligatoires.")
        } else {
            Axios.post('http://localhost:8080/createCode',{mail : mail, date : date}).then(response => {
                setError("Nouveau code : "+response.data)
            })
        }
    }

    function suppClient(id,code) {
        Axios.post('http://localhost:8080/suppPatient',{id : id, code:code}).then(response => {
            setAsked(false)
            navigate('/listeUtilisateurs')
        })
    };

    function suppMutuelle(id) {
        Axios.post('http://localhost:8080/suppMutuelle',{id : id}).then(response => {
            setAsked(false)
            navigate('/listeUtilisateurs')
        })
    };

    function suppPharmacien(id) {
        Axios.post('http://localhost:8080/suppPharmacien',{id : id}).then(response => {
            setAsked(false)
            navigate('/listeUtilisateurs')
        })
    };

    return (
        <div>
            <div className="login">
                <span className="login-title">Liste des utilisateurs</span>
            </div>
            <div className="page">
                <div className='titre'>Créer un code</div>
                <div className='center'>
                    <input type="email" id='name' placeholder='Adresse mail' onChange={handleMail}></input>
                    <button onClick={createCode}>Créer un code</button>
                    <div>{error}</div>
                </div>
                <div className='titre'>Liste des prescripteurs</div>
                <table className="liste">
                    <thead>
                    <tr className="trhead">
                        <td className="tdhead">Numéro RPPS</td>
                        <td className="tdhead">Nom</td>
                        <td className="tdhead">Prénom</td>
                        <td className="tdhead">Adresse mail</td>
                    </tr>
                    </thead>
                    <tbody>
                    {listePresc.map(user => {
                        return (
                            <tr className="tr">
                                <td className="td">{user.IdPrescripteur}</td>
                                <td className="td">{user.NomUtilisateur}</td>
                                <td className="td">{user.PrenomUtilisateur}</td>
                                <td className="td">{user.Mail}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <div className='titre'>Liste des pharmaciens</div>
                <table className="liste">
                    <thead>
                    <tr className="trhead">
                        <td className="tdhead">Numéro RPPS</td>
                        <td className="tdhead">Nom</td>
                        <td className="tdhead">Prénom</td>
                        <td className="tdhead">Adresse mail</td>
                        <td className="tdhead">Supprimer</td>
                    </tr>
                    </thead>
                    <tbody>
                    {listePharma.map(user => {
                        return (
                            <tr className="tr">
                                <td className="td">{user.IdPharmacien}</td>
                                <td className="td">{user.NomUtilisateur}</td>
                                <td className="td">{user.PrenomUtilisateur}</td>
                                <td className="td">{user.Mail}</td>
                                <td className="td"><button onClick={() => suppPharmacien(user.IdUtilisateur)}>Supprimer</button></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <div className='titre'>Liste des clients</div>
                <table className="liste">
                    <thead>
                        <tr className="trhead">
                            <td className="tdhead">Sécurité Sociale</td>
                            <td className="tdhead">Nom</td>
                            <td className="tdhead">Prénom</td>
                            <td className="tdhead">Adresse mail</td>
                            <td className="tdhead">Supprimer</td>
                        </tr>
                    </thead>
                    <tbody>
                    {listeClient.map(user => {
                        return (
                            <tr className="tr">
                                <td className="td">{user.IdPatient}</td>
                                <td className="td">{user.NomUtilisateur}</td>
                                <td className="td">{user.PrenomUtilisateur}</td>
                                <td className="td">{user.Mail}</td>
                                <td className="td"><button onClick={() => suppClient(user.IdUtilisateur, user.IdPatient)}>Supprimer</button></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <div className='titre'>Liste des mutuelles</div>
                <table className="liste">
                    <thead>
                    <tr className="trhead">
                        <td className="tdhead">Identifiant</td>
                        <td className="tdhead">Nom</td>
                        <td className="tdhead">Adresse mail</td>
                        <td className="tdhead">Supprimer</td>
                    </tr>
                    </thead>
                    <tbody>
                    {listeMutuelle.map(user => {
                        return (
                            <tr className="tr">
                                <td className="td">{user.IdMutuelle}</td>
                                <td className="td">{user.NomMutuelle}</td>
                                <td className="td">{user.Mail}</td>
                                <td className="td"><button onClick={() => suppMutuelle(user.IdMutuelle)}>Supprimer</button></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;