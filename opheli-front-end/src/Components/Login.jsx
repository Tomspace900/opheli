import React from 'react';
import { useState } from 'react';
import '../CSS/Login.css';
import LoginCard from './Login-cards/LoginCard';

const Login = () => {
    const [action, setAction] = useState(true);

    const handleAction = () => {
        setAction((actual) => !actual);
    };

    return (
        <div className="login">
            {action ? (
                <>
                    <span className="login-title">Connexion à votre compte</span>
                    <LoginCard />
                    <span className="login-box">Vous n'avez pas encore de compte ?</span>
                    <button className="login-link" onClick={handleAction}>
                        Enregistrez-vous ici
                    </button>
                </>
            ) : (
                <>
                    <span className="login-title">Enregistrez-vous</span>
                    <LoginCard />
                    <span className="login-box">Vous avez deja un compte ?</span>
                    <button className="login-link" onClick={handleAction}>
                        Connectez-vous ici
                    </button>
                </>
            )}
        </div>
    );
};

export default Login;
