import React, { useState } from 'react';
import '../CSS/List.css';
import '../CSS/Login.css';
import $ from 'jquery';
import Axios from "axios";
import {useNavigate} from "react-router-dom";

function List() {
    const [access, setAccess] = useState('start');
    const navigate = useNavigate();

    if (access == 'start') {
        Axios.post('http://localhost:8080/check',{code:'liste'}).then(response => {
            setAccess(response.data)
        });
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
