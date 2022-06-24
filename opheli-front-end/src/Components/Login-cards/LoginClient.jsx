import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginClient = () => {
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
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                console.log(data);
            },
        });
    };

    return (
        <form className="login-form" action="http://localhost/opheli/opheli-back-end/PHP/login/login.php" method="post" onSubmit={(event) => handleSumbit(event)}>
            <div className="login-form-line">
                <div className="login-form-blockline">
                    <div className="login-label-id">
                        <label>Numéro sécurité sociale :</label>
                    </div>
                    <div className="login-input-id">
                        <input type="text" placeholder="1234567890123" onChange={handleId} />
                    </div>
                </div>
            </div>
            <div className="login-form-line">
                <div className="login-form-blockline">
                    <div className="login-label-pwd">
                        <label>Mot de passe :</label>
                    </div>
                    <div className="login-input-pwd">
                        <input type="password" onChange={handlePassword} />
                    </div>
                </div>
            </div>
            <div className="login-submit">
                <button
                    component={Link}
                    to={'/'}
                    type="submit"
                    className="login-box-submit"
                    onMouseEnter={(e) => {
                        e.target.style.color = '#5ccdc4a9';
                        e.target.style.border = 'solid #5ccdc4 1px';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = '#4a565a';
                        e.target.style.border = 'solid #4a565a 1px';
                    }}
                    onClick={handleSubmit}>
                    {/* Vérifier compte dans la base de donnée */}
                    Se connecter
                </button>
            </div>
        </form>
    );
};

export default LoginClient;
