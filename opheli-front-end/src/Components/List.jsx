import React, {useState} from 'react';
import '../CSS/List.css';
import '../CSS/Login.css';
import $ from "jquery";

function List() {
    const [result, setResult] = useState([]);
    if (result.length == 0) {
        $.ajax({
            type: 'POST',
            url: "http://localhost/opheli/opheli-back-end/PHP/list_ordonnance.php",
            dataType: 'json',
            success: function (response) {
                if (response!="") {
                    setResult(response);
                }
            },
        });
        console.log(result);
    }


    return (
        <div>
            <div className="login">
                <span className="login-title">Liste des ordonnances</span>
            </div>
            <div className="page">
                <table className="liste">
                    <tbody>
                    {result.map(ordonnance => {
                        return (
                            <tr>
                                <td>{ordonnance.IdPrescripteur}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List;