import React from 'react';
import '../CSS/Login.css';
import LoginCard from './Login-cards/LoginCard';

const Login = () => {
    return (
        <div className="login">
            <span className="login-title">Connexion à votre compte</span>
            <LoginCard />
        </div>
    );
};

export default Login;
