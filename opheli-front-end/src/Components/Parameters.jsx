import React, { useState } from 'react';
import '../CSS/Login.css';
import '../CSS/Form.css';
import $ from 'jquery';

function UserList() {
    const [role, setRole] = useState('');
    const [user, setUser] = useState([]);
    if (role === '') {
        $.ajax({
            type: 'POST',
            url: 'http://localhost/opheli/opheli-back-end/PHP/utiles/role.php',
            dataType: 'text',
            success: function (response) {
                setRole(response);
            },
        });
    }
    if (user.length === 0) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost/opheli/opheli-back-end/PHP/parameters.php',
            dataType: 'json',
            success: function (response) {
                setUser(response);
            },
        });
    }
    console.log(role);
    if (role === 1) {
        //patient
    } else if (role >= 3) {
        //professionnel
    }
    return (
        <div>
            <div className="login">
                <span className="login-title">Paramètres</span>
            </div>
            <div className="page">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="nom">Nom : </label>
                                </td>
                                <td>
                                    <input type="text" className="form-control" id="nom" name="nom" required value={user.Nom} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="prenom">Prénom : </label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="prenom"
                                        name="prenom"
                                        required
                                        value={user.Prenom}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="mail">Mail : </label>
                                </td>
                                <td>
                                    <input
                                        type="mail"
                                        className="form-control"
                                        id="mail"
                                        name="mail"
                                        required
                                        value={user.Mail}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="mdp">Mot de passe : </label>
                                </td>
                                <td>
                                    <input type="password" className="form-control" id="mdp" name="mdp" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <label htmlFor="mdpval">Confirmez le mot de passe pour modifier votre profil : </label>
                    <input type="password" className="form-control" id="mdpval" name="mdpval" />
                    <br />
                    <button type="submit">Modifier</button>
                </form>
            </div>
        </div>
    );
}

export default UserList;
