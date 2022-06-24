import React from 'react';
import { useState } from 'react';

const LoginClient = () => {

    return (
        <form className="login-form" action="http://localhost/opheli/opheli-back-end/PHP/login/login_client.php" method="post" onSubmit={(event) => handleSumbit(event)}>
            <div className="login-form-line">
                <div className="login-form-blockline">
                    <div className="login-label-id">
                        <label>Numéro sécurité sociale :</label>
                    </div>
                    <div className="login-input-id">
                        <input name="login" id="login" type="text" placeholder="1234567890123"/>
                    </div>
                </div>
            </div>
            <div className="login-form-line">
                <div className="login-form-blockline">
                    <div className="login-label-pwd">
                        <label>Mot de passe :</label>
                    </div>
                    <div className="login-input-pwd">
                        <input name="pwd" id="pwd" type="password"/>
                    </div>
                </div>
            </div>
            <div className="login-submit">
                <button
                    type="submit"
                    className="login-box-submit"
                    onMouseEnter={(e) => {
                        e.target.style.color = '#5ccdc4a9';
                        e.target.style.border = 'solid #5ccdc4 1px';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = '#4a565a';
                        e.target.style.border = 'solid #4a565a 1px';
                    }}>
                    Se connecter
                </button>
            </div>
        </form>
    );
};

export default LoginClient;
