import React from 'react';

const RegisterClient = () => {
    return (
        <form className="register-form">
            <div className="register-label-id">
                <label htmlFor="id">Numéro de sécurité sociale :</label>
            </div>
            <br />
            <div className="register-input-id">
                <input type="text" id="id" placeholder="1234567890123" />
            </div>
            <br />
            <div className="login-label-pwd">
                <label htmlFor="pwd">Mot de passe :</label>
            </div>
            <br />
            <div className="register-input-pwd">
                <input type="password" id="pwd" />
            </div>
        </form>
    );
};

export default RegisterClient;
