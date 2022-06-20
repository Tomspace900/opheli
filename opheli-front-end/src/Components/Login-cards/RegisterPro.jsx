import React from 'react';

const RegisterPro = () => {
    return (
        <form className="register-form">
            <div className="register-label-id">
                <label htmlFor="id">Numero RPPS :</label>
            </div>
            <br />
            <div className="register-input-id">
                <input type="text" id="id" placeholder="12345678901" />
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

export default RegisterPro;
