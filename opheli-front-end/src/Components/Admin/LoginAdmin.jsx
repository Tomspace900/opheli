import React, { useState } from 'react';
import '../../CSS/Login.css';
import '../../CSS/Login-cards/LoginForms.css';
import {useNavigate} from "react-router-dom";
import Axios from "axios";

const LoginAdmin = ({setNom,setRole,setCode,setConnected}) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleId = (e) => {
        setId(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const submitLogin = () => {
        if (password == "" || id == "") {
            setError("Veuillez complétez tous les champs.")
        } else {
            Axios.post(
                'http://localhost:8080/loginAdmin',
                {
                    id: id,
                    password: password,
                    role: 'admin',
                }).then(response => {
                if (response.data == 'error') {
                    setError('Les données entrées ne correspondent pas à celles d\'un compte existant.');
                } else if (response.data == 'success') {
                    Axios.get('http://localhost:8080/infos').then((response) => {
                        setNom(response.data.nom);
                        setRole(response.data.role);
                        setCode(response.data.code);
                        setId(response.data.id);
                        if (response.data.nom != '') {
                            setConnected(true);
                        }
                        navigate('/')
                    });
                }
            });
        }
    };

    return (
        <div className="login">
            <div className="card">
                <div className="single-card-menu">
                    <div className="client"
                        id="client">
                        <span>Administrateur</span>
                    </div>
                </div>
                <form className="login-form">
                    <div className="login-form-line">
                        <div className="login-form-blockline">
                            <div className="login-label-id">
                                <label>Identifiant
                                    :</label>
                            </div>
                            <div className="login-input-id">
                                <input
                                    name="login"
                                    id="login"
                                    type="text"
                                    placeholder="1234567890123"
                                    onChange={handleId}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="login-form-line">
                        <div className="login-form-blockline">
                            <div className="login-label-pwd">
                                <label>Mot de passe :</label>
                            </div>
                            <div className="login-input-pwd">
                                <input name="pwd" id="pwd" type="password" onChange={handlePassword} />
                            </div>
                        </div>
                    </div>
                    <div className="login-submit">
                        <button
                            type="button"
                            className="login-box-submit"
                            onMouseEnter={(e) => {
                                e.target.style.color = '#5ccdc4a9';
                                e.target.style.border = 'solid #5ccdc4 1px';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#4a565a';
                                e.target.style.border = 'solid #4a565a 1px';
                            }}
                            onClick={submitLogin}>
                            Se connecter
                        </button>
                    </div>
                    <div>
                        {error}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginAdmin;