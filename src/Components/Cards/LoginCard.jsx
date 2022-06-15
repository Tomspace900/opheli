import React from 'react';
import './../../CSS/Cards/LoginCard.css';

const LoginCard = () => {
    return (
        <div className="login-card">
            <div className="login-card-menu">
                <div className="login-client">
                    <span>Client</span>
                </div>
                <div className="login-medecin">
                    <span>Médecin</span>
                </div>
                <div className="login-pharma">
                    <span>Pharmacien</span>
                </div>
                <div className="login-mutuelle">
                    <span>Mutuelle</span>
                </div>
            </div>
            <form className="login-form">
                <div className="login-label-id">
                    <label htmlFor="id">Identifiant :</label>
                </div>
                <br />
                <div className="login-input-id">
                    <input type="text" id="id" />
                </div>
                <br />
                <div className="login-label-pwd">
                    <label htmlFor="pwd">Mot de passe :</label>
                </div>
                <br />
                <div className="login-input-pwd">
                    <input type="password" id="pwd" />
                </div>
            </form>
        </div>
    );
};

export default LoginCard;
