import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Header.css';

const Header = () => {
    const [connected, isConnected] = useState(true);

    return (
        <div className="header">
            <Link to={'/'} className="opheli">
                Opheli
            </Link>
            {connected ? (
                <div className="header-profile">
                    <svg class="header-user-svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="12" cy="7" r="4" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    <div className="header-profile-name">
                        <span>Prenom</span>
                        <br />
                        <span>NOM</span>
                    </div>
                    <svg class="header-logout-svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M7 12h14l-3 -3m0 6l3 -3" />
                    </svg>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Header;
