import './../../CSS/Login-cards/LoginCard.css';
import { useState } from 'react';
import LoginClient from './LoginClient';
import LoginPro from './LoginPro';

const LoginCard = () => {
    const [action, setAction] = useState(true);

    const handleAction = (e) => {
        setAction(actual);
    };

    function mouseOver(e) {
        e.target.style.background = '#5ccdc4a9';
    }
    function mouseOut(e) {
        e.target.style.background = '';
    }

    return (
        <div className="login-card">
            <div className="login-card-menu">
                <div className="login-client" onMouseEnter={mouseOver} onMouseLeave={mouseOut} onClick={handleAction}>
                    <span>Client</span>
                </div>
                <div className="login-pro" onMouseEnter={mouseOver} onMouseLeave={mouseOut} onClick={handleAction}>
                    <span>Professionnel</span>
                </div>
            </div>
            <div className="login-form">
                {function ChangeForm(login) {
                    switch (login) {
                        case 0:
                            console.log('login: 0');
                            return <LoginClient />;
                        case 1:
                            console.log('login: 1');
                            return <LoginPro />;
                        default:
                            console.log('default');
                            return null;
                    }
                }}
            </div>
        </div>
    );
};

export default LoginCard;
