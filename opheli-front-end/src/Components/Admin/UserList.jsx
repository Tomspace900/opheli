import React, {useState} from 'react';
import '../../CSS/List.css';
import '../../CSS/Login.css';
import $ from "jquery";

function UserList() {
    const [result, setResult] = useState([]);
    if (result.length == 0) {
        $.ajax({
            type: 'POST',
            url: "http://localhost/opheli/opheli-back-end/PHP/Admin/user_list.php",
            dataType: 'json',
            success: function (response) {
                if (response!="") {
                    setResult(response);
                }
            },
        });
        console.log(result);
    }
    console.log(result);


    return (
        <div>
            <div className="login">
                <span className="login-title">Liste des utilisateurs</span>
            </div>
            <div className="page">
                <table>
                    <tbody>
                    {result.map(user => {
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