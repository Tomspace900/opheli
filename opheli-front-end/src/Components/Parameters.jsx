import React, {useState,useEffect,setState} from 'react';
import '../CSS/Login.css';
import '../CSS/Form.css';
import $ from "jquery";

function UserList() {
    const [user, setUser] = useState([]);
    const [message, setMessage] = useState('');
    if (user.length == 0) {
        $.ajax({
            type: 'POST',
            url: "http://localhost/opheli/opheli-back-end/PHP/parameters.php",
            dataType: 'json',
            success: function (response) {
                setUser(response);
            },
        });
    }
    const submit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        console.log(form);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                setMessage(data);
            },
        });
    };

    return (
        <div>
            <div className="login">
                <span className="login-title">Paramètres</span>
            </div>
            <div className="page">
                <div>{message}</div>
                <form
                    action="http://opheli/opheli-back-end/PHP/parameters/parameters.php"
                    method="post"
                    onSubmit={(event) => submit(event)}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="nom">Nom : </label></td>
                                <td><input type="text" className="form-control" id="nom" name="nom" value={user.Nom}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="prenom">Prénom : </label></td>
                                <td><input type="text" className="form-control" id="prenom" name="prenom" value={user.Prenom}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="mail">Mail : </label></td>
                                <td><input type="mail" className="form-control" id="mail" name="mail" value={user.Mail}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="mdp">Mot de passe : </label></td>
                                <td><input type="password" className="form-control" id="mdp" name="mdp"/></td>
                            </tr>
                        </tbody>
                    </table>
                    <label htmlFor="mdpval">Confirmer le mot de passe pour modifier mon compte : </label>
                    <input type="password" className="form-control" id="mdpval" name="mdpval"/><br/>
                    <button type="submit">Modifier</button>
                </form>
                <form
                    action="http://opheli/opheli-back-end/PHP/parameters/supp_account.php"
                    method="post"
                    onSubmit={(event) => submit(event)}>
                    <label htmlFor="mdpval">Confirmer le mot de passe pour supprimer mon compte : </label>
                    <input type="password" className="form-control" id="mdpval" name="mdpval"/><br/>
                    <button type="submit" className="supp">Supprimer mon compte</button>
                </form>
            </div>
        </div>
    );
}

export default UserList;