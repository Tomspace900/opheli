import React, {useEffect, useRef} from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Axios from 'axios';

const LoginForm = ({ account }) => {
    // Donnees a envoyer à la BDD
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
        Axios.post(
            'http://localhost:8080/login',
            {
                id: id,
                password: password,
                role: account,
            }).then(response => {
            console.log(response.data)
            if (response.data == 'error') {
                setError('Les données entrées ne correspondent pas à celles d\'un compte existant.');
            } else if (response.data == 'success') {
                navigate('/List')
            }
        });
    };
    /*
    useEffect(() => {
        if (redirect == true) {
            navigation.navigate('/List');
        }
    }, [redirect]);*/

    return (
        <form className="login-form">
            <div className="login-form-line">
                {(() => {
                    switch (account) {
                        case 'medecin':
                            return (
                                <div className="login-form-blockline">
                                    <div className="login-label-id">
                                        <label>Numéro RPPS :</label>
                                    </div>
                                    <div className="login-input-id">
                                        <input
                                            name="login"
                                            id="login"
                                            type="text"
                                            placeholder="12345678901"
                                            onChange={handleId}
                                        />
                                    </div>
                                </div>
                            );
                        case 'pharma':
                            return (
                                <div className="login-form-blockline">
                                    <div className="login-label-id">
                                        <label>Numéro RPPS :</label>
                                    </div>
                                    <div className="login-input-id">
                                        <input
                                            name="login"
                                            id="login"
                                            type="text"
                                            placeholder="12345678901"
                                            onChange={handleId}
                                        />
                                    </div>
                                </div>
                            );
                        case 'mutuelle':
                            return (
                                <div className="login-form-blockline">
                                    <div className="login-label-id">
                                        <label>Numéro mutuelle :</label>
                                    </div>
                                    <div className="login-input-id">
                                        <input
                                            name="login"
                                            id="login"
                                            type="text"
                                            placeholder="12345678901"
                                            onChange={handleId}
                                        />
                                    </div>
                                </div>
                            );
                        default:
                            return (
                                <div className="login-form-blockline">
                                    <div className="login-label-id">
                                        <label>Numéro sécurité sociale :</label>
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
                            );
                    }
                })()}
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
    );
};

export default LoginForm;
