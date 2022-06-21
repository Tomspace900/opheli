import React from 'react';
import { useState } from 'react';
import RegisterClient from './RegisterClient';
import RegisterPro from './RegisterPro';

const RegisterCard = () => {
    const [register, setRegister] = useState('client');

    const handleRegister = (registerState) => {
        setRegister(registerState);
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
                <div className="client" onMouseEnter={mouseOver} onMouseLeave={mouseOut} onClick={() => handleRegister('client')}>
                    <span>Client</span>
                </div>
                <div className="pro" onMouseEnter={mouseOver} onMouseLeave={mouseOut} onClick={() => handleRegister('pro')}>
                    <span>Professionnel</span>
                </div>
            </div>
            {(() => {
                switch (register) {
                    case 'pro':
                        return <RegisterPro />;
                    default:
                        return <RegisterClient />;
                }
            })()}
        </div>
    );
};

export default RegisterCard;
