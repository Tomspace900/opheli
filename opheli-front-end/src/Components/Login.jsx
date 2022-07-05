import React, { useEffect, useState } from 'react';
import '../CSS/Login.css';
import '../CSS/Login-cards/LoginForms.css';
import LoginForm from './Login-cards/LoginForm';
import RegisterMedecin from './Login-cards/RegisterMedecin';
import RegisterClient from './Login-cards/RegisterClient';
import RegisterPharma from './Login-cards/RegisterPharma';
import RegisterMutuelle from './Login-cards/RegisterMutuelle';

const Login = ({ setNom, setRole, setCode, setConnected }) => {
    const [action, setAction] = useState(true);
    const [login, setLogin] = useState('client');

    const handleAction = () => {
        setAction((actual) => !actual);
    };

    const handleLogin = (loginState) => {
        setLogin(loginState);
    };

    function mouseOver(e) {
        e.target.style.color = '#5ccdc4a9';
        e.target.style.border = 'solid #5ccdc4a9 1px';
    }
    function mouseOut(e) {
        e.target.style.color = '#4a565a';
        e.target.style.border = 'solid #4a565a 1px';
    }

    useEffect(() => {
        document.getElementById('client').style.background = '#5ccdc4a9';
    }, []);

    return (
        <div className="login">
            <span className="login-title">{action ? 'Connexion a votre compte' : 'Enregistrez-vous'}</span>
            <div className="card">
                <div className="card-menu">
                    <div
                        className="client"
                        id="client"
                        onClick={() => {
                            handleLogin('client');
                            document.getElementById('client').style.background = '#5ccdc4a9';
                            document.getElementById('medecin').style.background = '#ffffff';
                            document.getElementById('pharma').style.background = '#ffffff';
                            document.getElementById('mutuelle').style.background = '#ffffff';
                        }}>
                        <span>Client</span>
                    </div>
                    <div
                        className="medecin"
                        id="medecin"
                        onClick={() => {
                            handleLogin('medecin');
                            document.getElementById('client').style.background = '#ffffff';
                            document.getElementById('medecin').style.background = '#5ccdc4a9';
                            document.getElementById('pharma').style.background = '#ffffff';
                            document.getElementById('mutuelle').style.background = '#ffffff';
                        }}>
                        <span>Medecin</span>
                    </div>
                    <div
                        className="pharma"
                        id="pharma"
                        onClick={() => {
                            handleLogin('pharma');
                            document.getElementById('client').style.background = '#ffffff';
                            document.getElementById('medecin').style.background = '#ffffff';
                            document.getElementById('pharma').style.background = '#5ccdc4a9';
                            document.getElementById('mutuelle').style.background = '#ffffff';
                        }}>
                        <span>Pharmacien</span>
                    </div>
                    <div
                        className="mutuelle"
                        id="mutuelle"
                        onClick={() => {
                            handleLogin('mutuelle');
                            document.getElementById('client').style.background = '#ffffff';
                            document.getElementById('medecin').style.background = '#ffffff';
                            document.getElementById('pharma').style.background = '#ffffff';
                            document.getElementById('mutuelle').style.background = '#5ccdc4a9';
                        }}>
                        <span>Mutuelle</span>
                    </div>
                </div>
                {action
                    ? (() => {
                          switch (login) {
                              case 'medecin':
                                  return (
                                      <LoginForm
                                          setNom={setNom}
                                          setRole={setRole}
                                          setCode={setCode}
                                          setConnected={setConnected}
                                          account="medecin"
                                      />
                                  );
                              case 'pharma':
                                  return (
                                      <LoginForm
                                          setNom={setNom}
                                          setRole={setRole}
                                          setCode={setCode}
                                          setConnected={setConnected}
                                          account="pharma"
                                      />
                                  );
                              case 'mutuelle':
                                  return (
                                      <LoginForm
                                          setNom={setNom}
                                          setRole={setRole}
                                          setCode={setCode}
                                          setConnected={setConnected}
                                          account="mutuelle"
                                      />
                                  );
                              default:
                                  return (
                                      <LoginForm
                                          setNom={setNom}
                                          setRole={setRole}
                                          setCode={setCode}
                                          setConnected={setConnected}
                                          account="client"
                                      />
                                  );
                          }
                      })()
                    : (() => {
                          switch (login) {
                              case 'medecin':
                                  return (
                                      <RegisterMedecin
                                          setNom={setNom}
                                          setRole={setRole}
                                          setCode={setCode}
                                          setConnected={setConnected}
                                      />
                                  );
                              case 'pharma':
                                  return (
                                      <RegisterPharma
                                          setNom={setNom}
                                          setRole={setRole}
                                          setCode={setCode}
                                          setConnected={setConnected}
                                      />
                                  );
                              case 'mutuelle':
                                  return (
                                      <RegisterMutuelle
                                          setNom={setNom}
                                          setRole={setRole}
                                          setCode={setCode}
                                          setConnected={setConnected}
                                      />
                                  );
                              default:
                                  return (
                                      <RegisterClient
                                          setNom={setNom}
                                          setRole={setRole}
                                          setCode={setCode}
                                          setConnected={setConnected}
                                      />
                                  );
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
