import React from 'react';

const LoginPharma = () => {
    return (
        <form className="login-pharma">
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
        </form>
    );
};

export default LoginPharma;
