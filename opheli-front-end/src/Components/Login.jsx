import React, { useState } from 'react';
import '../CSS/Login.css';
import LoginCard from './Login-cards/LoginCard';
import RegisterCard from './Login-cards/RegisterCard';
import $ from "jquery";

const Login = () => {
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

    const [action, setAction] = useState(true);

    const handleAction = () => {
        setAction((actual) => !actual);
    };

    function mouseOver(e) {
        e.target.style.color = '#5ccdc4a9';
        e.target.style.border = 'solid #5ccdc4a9 1px';
    }
    function mouseOut(e) {
        e.target.style.color = '#4a565a';
        e.target.style.border = 'solid #4a565a 1px';
    }

    return (
        <div className="login">
            {action ? (
                <>
                    <span className="login-title">Connexion à votre compte</span>
                    <LoginCard />
                    <span className="login-question">Vous n'avez pas encore de compte ?</span>
                    <button className="login-box" onClick={handleAction} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                        Enregistrez-vous ici
                    </button>
                </>
            ) : (
                <>
                    <span className="login-title">Enregistrez-vous</span>
                    <RegisterCard />
                    <span className="login-question">Vous avez deja un compte ?</span>
                    <button className="login-box" onClick={handleAction} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                        Connectez-vous ici
                    </button>
                </>
            )}
        </div>
    );
};

export default Login;
