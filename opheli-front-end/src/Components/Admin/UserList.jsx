import React, {useState,useEffect,setState} from 'react';
import '../../CSS/List.css';
import '../../CSS/Login.css';
import $ from "jquery";

function UserList() {
    const [users, setResult] = useState([]);
    if (users.length == 0) {
        $.ajax({
            type: 'POST',
            url: "http://localhost/opheli/opheli-back-end/PHP/Admin/user_list.php",
            dataType: 'json',
            success: function (response) {
                setResult(response);
            },
        });
        console.log(users);
    }
    console.log(users);

    return (
        <div>
            <div className="login">
                <span className="login-title">Liste des utilisateurs</span>
            </div>
            <div className="page">
                <table>
                    <tbody>
                    {users.map(user => {
                        return (
                            <tr>
                                <td>{user.IdPrescripteur}</td>
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