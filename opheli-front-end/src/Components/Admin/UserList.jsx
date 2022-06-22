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

    const handleSumbit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        console.log(form);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                console.log(data);
            },
        });
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
                        {prescripteurs.map(user => {
                            return (
                                <tr>
                                    <td>{user.IdPrescripteur}</td>
                                    <td>{user.NomSpecialite}</td>
                                    <td>{user.Nom}</td>
                                    <td>{user.Prenom}</td>
                                    <td>{user.Mail}</td>
                                    <td>
                                        <form action="http://localhost/opheli/opheli-back-end/PHP/Admin/user_functions.php" method="post" onSubmit={(event) => handleSumbit(event)}>
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
                        {patients.map(user => {
                            return (
                                <tr>
                                    <td>{user.SecuriteSociale}</td>
                                    <td>{user.Nom}</td>
                                    <td>{user.Prenom}</td>
                                    <td>{user.Mail}</td>
                                    <td>
                                        <form action="http://localhost/opheli/opheli-back-end/PHP/Admin/user_functions.php" method="post" onSubmit={(event) => handleSumbit(event)}>
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