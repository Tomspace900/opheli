import React from 'react';
import '../CSS/List.css';
import '../CSS/Login.css';

const List = () => {
    $.ajax({
        type: "POST",
        url: form.attr("action"),
        data: form.serialize(),
        success(data) {
            setResult(data);
            sessionStorage.setItem("info",data); //foutre la donnée en stockage du navigateur
        },
    });

    return (
        <div>
            <div className="login">
                <span className="login-title">Liste des ordonnances</span>
            </div>
            <div className="page">
                <table>
                    <tr>
                        <td>Ordonnance</td>
                        <td>Date</td>
                        <td>Description</td>
                        <td>Modifier</td>
                        <td>Supprimer</td>
                    </tr>
                    <tr>
                        <td>Ordonnance</td>
                        <td>Date</td>
                        <td>Description</td>
                        <td>Modifier</td>
                        <td>Supprimer</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default List;