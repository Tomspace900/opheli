import React from 'react';
import '../CSS/Login.css';
import LoginCard from './Cards/LoginCard';

const Login = () => {
    return (
        <div className="login">
            <div className="login-content">
                <span className="login-title">Connexion à votre compte</span>
                <LoginCard />
            </div>
        </div>
    );
};

export default Login;
