import React from 'react';
import './../CSS/Home.css';
import HomeMedecin from './HomeCards/HomeMedecin';
import {useNavigate} from "react-router-dom";

const Home = (role) => {
    const navigate = useNavigate();

    if (role  == "") {navigate('/Error')}

    return (
        // Renvoyer au login si le token de connexion n'est pas/plus valide
        <div className="home">
            <HomeMedecin />
        </div>
    );
};

export default Home;
