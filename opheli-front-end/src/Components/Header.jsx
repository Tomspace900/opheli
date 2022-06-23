import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Header.css';
import '../CSS/Index.css';

const Header = () => {
    return (
        // Ajouter un lien vers profil si connecté
        <div className="header">
            <Link to={'/Home.jsx'} className="opheli">
                Opheli
            </Link>
        </div>
    );
};

export default Header;
