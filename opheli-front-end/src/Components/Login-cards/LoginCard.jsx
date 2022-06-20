import { useState } from 'react';
import './../../CSS/Login-cards/LoginCard.css';
import LoginClient from './LoginClient';
import LoginPro from './LoginPro';

const LoginCard = () => {
    const [login, setLogin] = useState(true);
    //test pour max
    const handleLogin = () => {
        setLogin((actual) => !actual);
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
                <div className="client" onMouseEnter={mouseOver} onMouseLeave={mouseOut} onClick={handleLogin}>
                    <span>Client</span>
                </div>
                <div className="pro" onMouseEnter={mouseOver} onMouseLeave={mouseOut} onClick={handleLogin}>
                    <span>Professionnel</span>
                </div>
            </div>
            <>{login ? <LoginClient /> : <LoginPro />}</>
        </div>
    );
};

export default LoginCard;
