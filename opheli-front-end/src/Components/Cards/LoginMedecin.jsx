import React from 'react';

const LoginMedecin = () => {
    return (
        <form className="login-medecin">
            <form className="login-form">
                <div className="login-label-id">
                    <label htmlFor="id">Numéro RPPS :</label>
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
        </form>
    );
};

export default LoginMedecin;
