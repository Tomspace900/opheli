import React from 'react';
import { Link } from 'react-router-dom';

const LoginPro = () => {
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
                    onMouseLeave={mouseOut}>
                    {/* Vérifier compte dans la base de donnée */}
                    Se connecter
                </button>
            </div>
        </form>
    );
};

export default LoginPro;
