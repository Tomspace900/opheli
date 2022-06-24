import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPro = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            dataType: "text",
            success(data) {
                console.log(data);
            },
        });
    };

    return (
        <form className="login-form" action="http://localhost/opheli/opheli-back-end/PHP/login/login_pro.php" method="post" onSubmit={(event) => handleSumbit(event)}>
            <div className="login-form-line">
                <div className="login-form-blockline">
                    <div className="login-label-id">
                        <label>Numéro RPPS :</label>
                    </div>
                    <div className="login-input-id">
                        <input type="text" placeholder="12345678901"/>
                    </div>
                </div>
            </div>
            <div className="login-form-line">
                <div className="login-form-blockline">
                    <div className="login-label-pwd">
                        <label>Mot de passe :</label>
                    </div>
                    <div className="login-input-pwd">
                        <input type="password"/>
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

export default LoginPro;
