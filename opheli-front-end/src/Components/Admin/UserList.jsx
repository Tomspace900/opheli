import React, {useState,useEffect,setState} from 'react';
import '../../CSS/List.css';
import '../../CSS/Login.css';
import $ from "jquery";
import {useNavigate} from "react-router-dom";
import Axios from "axios";

function UserList({role}) {
    const [ask, setAsked] = useState(false);
    const [listeClient, setListeClient] = useState([]);
    const [listePresc, setListePresc] = useState([]);
    const [listePharma, setListePharma] = useState([]);
    const [listeMutuelle, setListeMutuelle] = useState([]);
    const [access, setAccess] = useState('start');
    const navigate = useNavigate();

    function suppClient(id) {
        Axios.post('http://localhost:8080/suppUser',{idClient : id})
        listeUsers();
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

    const handleSubmit = () => {

    };

    return (
        <div>
            <div className="login">
                <span className="login-title">Liste des utilisateurs</span>
            </div>
            <div className="page">
                <div className="container">
                    <table>
                        <tbody>
                        {listePresc.map(user => {
                            return (
                                <tr>
                                    <td>{user.IdPrescripteur}</td>
                                    <td>{user.NomSpecialite}</td>
                                    <td>{user.Nom}</td>
                                    <td>{user.Prenom}</td>
                                    <td>{user.Mail}</td>
                                    <td>
                                        <form action="http://opheli/opheli-back-end/PHP/Admin/user_functions.php" method="post" onSubmit={(event) => handleSubmit(event)}>
                                            <input id="toDelete" name="toDelete" type="hidden" value={user.IdUtilisateur}/>
                                            <button type="submit">Supprimer</button>
                                        </form>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    <table>
                        <tbody>
                        {listeClient.map(user => {
                            return (
                                <tr>
                                    <td>{user.SecuriteSociale}</td>
                                    <td>{user.Nom}</td>
                                    <td>{user.Prenom}</td>
                                    <td>{user.Mail}</td>
                                    <td>
                                        <form action="http://opheli/opheli-back-end/PHP/Admin/user_functions.php" method="post" onSubmit={(event) => handleSubmit(event)}>
                                            <input id="toDelete" name="toDelete" type="hidden" value={user.IdUtilisateur}/>
                                            <button type="submit">Supprimer</button>
                                        </form>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserList;