import React from 'react';
import './../CSS/Home.css';
import HomeMedecin from './HomeCards/HomeMedecin';
import List from './List';
import ListeClients from './Mutuelle/ListeClients';
import Login from './Login';

const Home = ({setNom, setRole, setCode, setConnected, role}) => {

    switch (role) {
        case 'medecin' :
            return (<div className="home"><HomeMedecin role={role}/></div>);
            break;
        case 'client':
            return (<div className="home"><List role={role}/></div>);
            break;
        case 'mutuelle':
            return (<div className="home"><ListeClients role={role}/></div>);
            break;
        case 'pharma':
            return (<div className="home"><ListeClients role={role} /></div>);
            break;
        default:
            return (<div className="home"><Login setNom={setNom} setRole={setRole} setCode={setCode} setConnected={setConnected} role={role} /></div>);
            break;
    }

};

export default Home;
