import React from 'react';
import './../CSS/Home.css';
import HomeMedecin from './HomeCards/HomeMedecin';

const Home = () => {
    return (
        // Renvoyer au login si le token de connexion n'est pas/plus valide
        <div className="home">
            <HomeMedecin />
        </div>
    );
};

export default Home;
