import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPro = () => {
    // Donnees a envoyer à la BDD
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleId = (e) => {
        setId(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // C'est cette fonction qui va verifier si le boug existe dans la BDD
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    function mouseOver(e) {
        e.target.style.color = '#5ccdc4a9';
        e.target.style.border = 'solid #5ccdc4 1px';
    }
    function mouseOut(e) {
        e.target.style.color = '#4a565a';
        e.target.style.border = 'solid #4a565a 1px';
    }
    return (
        <form className="login-form">
            <div className="login-form-line">
                <div className="login-form-blockline">
                    <div className="login-label-id">
                        <label>Numéro RPPS :</label>
                    </div>
                    <div className="login-input-id">
                        <input type="text" placeholder="12345678901" />
                    </div>
                </div>
            </div>
            <div className="login-form-line">
                <div className="login-form-blockline">
                    <div className="login-label-pwd">
                        <label>Mot de passe :</label>
                    </div>
                    <div className="login-input-pwd">
                        <input type="password" />
                    </div>
                </div>
            </div>
            <div className="login-submit">
                <button
                    component={Link}
                    to={'/Home.jsx'}
                    type="submit"
                    className="login-box-submit"
                    onMouseEnter={mouseOver}
                    onMouseLeave={mouseOut}
                    onClick={handleSubmit}>
                    {/* Vérifier compte dans la base de donnée */}
                    Se connecter
                </button>
            </div>
        </form>
    );
};

export default LoginPro;
