import React from 'react';
import { useState } from 'react';
import RegisterClient from './RegisterClient';
import RegisterPro from './RegisterPro';

const RegisterCard = () => {
    const [login, setLogin] = useState(true);

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
            <>{login ? <RegisterClient /> : <RegisterPro />}</>
        </div>
    );
};

export default RegisterCard;