import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Header.css';
import Axios from 'axios';

const Header = ({ nom, connected, setConnected, setNom, setRole, setCode, setId }) => {
    const navigate = useNavigate();

    function handleDisconnect() {
        setConnected(false);
        Axios.get('http://localhost:8080/deconnexion');
        Axios.get('http://localhost:8080/infos')
            .then((response) => {
                setNom(response.data.nom);
                setRole(response.data.role);
                setCode(response.data.code);
                setId(response.data.id);
            })
            .then(navigate('/'));
    }

    const [titleOver, setTitleOver] = useState(false);

    return (
        <div className="header">
            <Link
                to={'/'}
                className="opheli"
                onMouseOver={() => {
                    setTitleOver(true);
                }}
                onMouseOut={() => {
                    setTitleOver(false);
                }}>
                {titleOver ? (
                    <img src="/Opheli_Logo_Blue.png" alt="logo-blue" />
                ) : (
                    <img src="/Opheli_Logo_Black.png" alt="logo-black" />
                )}
            </Link>
            {connected ? (
                <div className="header-profile">
                    <Link to={'/profil'} className="header-user-link">
                        <svg className="header-user-svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="7" r="4" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                    </Link>
                    <div className="header-profile-name">{nom}</div>
                    <div className="header-logout-link">
                        <svg
                            onClick={handleDisconnect}
                            className="header-logout-svg"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                            <path d="M7 12h14l-3 -3m0 6l3 -3" />
                        </svg>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Header;
