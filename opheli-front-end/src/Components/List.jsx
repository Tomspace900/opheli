import React, { useState } from 'react';
import '../CSS/List.css';
import '../CSS/Login.css';
import Axios from "axios";
import {useNavigate} from "react-router-dom";

function List({role}) {
    const [access, setAccess] = useState('start');
    const navigate = useNavigate();

    console.log(role)

    //TODO ça c'était pour mes tests c'est pas final je pense -Clovis
    const [id, setId] = useState(12354698351);
    const [listOrdos, setListOrdos] = useState([]);

    if (access == 'start') {
        Axios.post('http://localhost:8080/check',{code:'liste'}).then(response => {
            setAccess(response.data)
        });
        //requête qui get les ordos selon le rôle
        Axios.post('http://localhost:8080/getListeOrdonnances', {
            role : role,
            id : id,
        }).then(response => {
            setListOrdos(response.data);
            console.log(response.data);
        })
    }
    if (access == false) {
        navigate('/Error')
    }

    return (
        <div>
            <div className="login">
                <span className="login-title">Liste des ordonnances</span>
            </div>
            <div className="page">
                <table className="liste">
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List;
