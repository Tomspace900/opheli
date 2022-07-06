import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomeMutuelle = ({ role }) => {
    const navigate = useNavigate();

    if (role.role === '') {
        navigate('/Error');
    }

    function mouseOver(e) {
        e.target.style.background = '#5ccdc4a9';
    }
    function mouseOut(e) {
        e.target.style.background = '';
    }

    return (
        <div className="home-cards">
            <Link to={'/list'} className="home-div-left" onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                <div className="home-left-title-div">
                    <span className="home-leftm-title">Ordonnances délivrées aux clients</span>
                </div>
                <div className="home-left-svg-div">
                    <svg
                        className="icon icon-tabler icon-tabler-file-check"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                        <path d="M9 15l2 2l4 -4" />
                    </svg>
                </div>
            </Link>
            <Link to={'/listeClients'} className="home-div-right" onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                <div className="home-right-title-div">
                    <span className="home-right-title">Liste des clients</span>
                </div>
                <div className="home-right-svg-div">
                    <svg
                        className="icon icon-tabler icon-tabler-users"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                    </svg>
                </div>
            </Link>
        </div>
    );
};

export default HomeMutuelle;
