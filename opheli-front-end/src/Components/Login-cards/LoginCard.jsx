import { useState } from 'react';
import './../../CSS/Login-cards/LoginCard.css';
import LoginClient from './LoginClient';
import LoginPro from './LoginPro';

function LoginCard() {
    const [login, setLogin] = useState('client');
    // this.tabState = { tab: 'client', class: 'on' };

    const handleLogin = (loginState) => {
        setLogin(loginState);
    };

    // const handleTab = (state) => {
    //     this.tabState.tab = state;
    //     if (this.tabState.tab === state) {
    //         console.log('client on');
    //         this.setState({ class: 'on' });
    //     } else {
    //         console.log('client off');
    //         this.setState({ class: 'off' });
    //     }
    //     console.log('change state');
    // };

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
                    // {this.tabState.class}
                    onMouseEnter={mouseOver}
                    onMouseLeave={mouseOut}
                    onClick={() => {
                        // handleTab('client');
                        handleLogin('client');
                    }}>
                    <span>Client</span>
                </div>
                <div
                    className="pro"
                    // {this.tabState.class}
                    onMouseEnter={mouseOver}
                    onMouseLeave={mouseOut}
                    onClick={() => {
                        // handleTab('pro');
                        handleLogin('pro');
                    }}>
                    <span>Professionnel</span>
                </div>
            </div>
            {(() => {
                switch (login) {
                    case 'pro':
                        return <LoginPro />;
                    default:
                        return <LoginClient />;
                }
            })()}
        </div>
    );
}

export default LoginCard;
