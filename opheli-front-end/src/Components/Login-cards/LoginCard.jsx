import { useState } from 'react';
import './../../CSS/Login-cards/LoginCard.css';
import LoginClient from './LoginClient';
import LoginPro from './LoginPro';

function LoginCard() {
    const [login, setLogin] = useState('client');
    const [tab, setTab] = useState('client');

    const handleLogin = (loginState) => {
        setLogin(loginState);
    };

    const handleTab = (e, tab) => {
        switch (tab) {
            case 'pro':
                break;

            default:
                break;
        }
    };

    function mouseOver(e) {
        e.target.style.background = '#5ccdc4a9';
    }
    function mouseOut(e) {
        e.target.style.background = '';
    }

    return (
        <div className="card">
            <div className="card-menu">
                <div
                    className="client"
                    onMouseEnter={mouseOver}
                    onMouseLeave={mouseOut}
                    onClick={() => {
                        handleTab;
                        handleLogin('client');
                    }}>
                    <span>Client</span>
                </div>
                <div
                    className="pro"
                    onMouseEnter={mouseOver}
                    onMouseLeave={mouseOut}
                    onClick={() => {
                        handleTab;
                        handleLogin('pro');
                    }}>
                    <span>Professionnel</span>
                </div>
            </div>
            {(() => {
                switch (login) {
                    case 'pro':
                        setTab('pro');
                        return <LoginPro />;
                    default:
                        setTab('client');
                        return <LoginClient />;
                }
            })()}
        </div>
    );
}

export default LoginCard;
