import React, {useState,useEffect,setState} from 'react';
import '../../CSS/List.css';
import '../../CSS/Login.css';
import $ from "jquery";

function UserList() {
    const [patients, setPat] = useState([]);
    if (patients.length == 0) {
        $.ajax({
            type: 'POST',
            url: "http://localhost/opheli/opheli-back-end/PHP/Admin/patients.php",
            dataType: 'json',
            success: function (response) {
                setPat(response);
            },
        });
    }

    const [prescripteurs, setPre] = useState([]);
    if (prescripteurs.length == 0) {
        $.ajax({
            type: 'POST',
            url: "http://localhost/opheli/opheli-back-end/PHP/Admin/prescripteurs.php",
            dataType: 'json',
            success: function (response) {
                setPre(response);
            },
        });
    }
    console.log(prescripteurs);

    return (
        <div>
            <div className="login">
                <span className="login-title">Liste des utilisateurs</span>
            </div>
            <div className="page">
                <div className="container">
                    <table>
                        <tbody>
                        {prescripteurs.map(user => {
                            return (
                                <tr>
                                    <td>{user.IdPrescripteur}</td>
                                    <td>{user.NomSpecialite}</td>
                                    <td>{user.Nom}</td>
                                    <td>{user.Prenom}</td>
                                    <td>{user.Mail}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    <table>
                        <tbody>
                        {patients.map(user => {
                            return (
                                <tr>
                                    <td>{user.SecuriteSociale}</td>
                                    <td>{user.Nom}</td>
                                    <td>{user.Prenom}</td>
                                    <td>{user.Mail}</td>
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