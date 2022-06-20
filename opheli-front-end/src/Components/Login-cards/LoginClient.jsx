import React from 'react';

const LoginClient = () => {
    return (
        <form className="login-form">
            <div className="login-label-id">
                <label htmlFor="id">Numéro de sécurité sociale :</label>
            </div>
            <br />
            <div className="login-input-id">
                <input type="text" id="id" placeholder="1234567890123" />
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
    );
};

export default LoginClient;
