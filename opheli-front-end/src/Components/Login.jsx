import React, { useState } from 'react';
import '../CSS/Login.css';
import '../CSS/Login-cards/LoginForms.css';
import $ from 'jquery';
import LoginForm from './Login-cards/LoginForm';
import RegisterMedecin from './Login-cards/RegisterMedecin';
import RegisterClient from './Login-cards/RegisterClient';
import RegisterPharma from './Login-cards/RegisterPharma';
import RegisterMutuelle from './Login-cards/RegisterMutuelle';

const Login = () => {
    const [action, setAction] = useState(true);
    const [login, setLogin] = useState('client');

    const handleAction = () => {
        setAction((actual) => !actual);
    };

    const handleLogin = (loginState) => {
        setLogin(loginState);
    };

    function tabOver(e) {
        e.target.style.background = '#5ccdc4a9';
    }
    function tabOut(e) {
        e.target.style.background = '';
    }

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
            <span className="login-title">{action ? 'Connexion a votre compte' : 'Enregistrez-vous'}</span>
            <div className="card">
                <div className="card-menu">
                    <div
                        className="client"
                        onMouseEnter={tabOver}
                        onMouseLeave={tabOut}
                        onClick={() => {
                            handleLogin('client');
                        }}>
                        <span>Client</span>
                    </div>
                    <div
                        className="medecin"
                        onMouseEnter={tabOver}
                        onMouseLeave={tabOut}
                        onClick={() => {
                            handleLogin('medecin');
                        }}>
                        <span>Medecin</span>
                    </div>
                    <div
                        className="pharma"
                        onMouseEnter={tabOver}
                        onMouseLeave={tabOut}
                        onClick={() => {
                            handleLogin('pharma');
                        }}>
                        <span>Pharmacien</span>
                    </div>
                    <div
                        className="mutuelle"
                        onMouseEnter={tabOver}
                        onMouseLeave={tabOut}
                        onClick={() => {
                            handleLogin('mutuelle');
                        }}>
                        <span>Mutuelle</span>
                    </div>
                </div>
                {action
                    ? (() => {
                          switch (login) {
                              case 'medecin':
                                  return <LoginForm account="medecin" />;
                              case 'pharma':
                                  return <LoginForm account="pharma" />;
                              case 'mutuelle':
                                  return <LoginForm account="mutuelle" />;
                              default:
                                  return <LoginForm account="client" />;
                          }
                      })()
                    : (() => {
                          switch (login) {
                              case 'medecin':
                                  return <RegisterMedecin />;
                              case 'pharma':
                                  return <RegisterPharma />;
                              case 'mutuelle':
                                  return <RegisterMutuelle />;
                              default:
                                  return <RegisterClient />;
                          }
                      })()}
            </div>
            <span className="login-question">{action ? "Vous n'avez pas encore de compte ?" : 'Vous avez deja un compte ?'}</span>
            <button className="login-box" onClick={handleAction} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                {action ? 'Enregistrez-vous ici' : 'Connectez-vous ici'}
            </button>
        </div>
    );
};

export default Login;
