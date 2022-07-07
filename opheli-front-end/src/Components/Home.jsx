import React from 'react';
import './../CSS/Home.css';
import HomeMedecin from './HomeCards/HomeMedecin';
import List from './List';
import Login from './Login';
import HomePharma from './HomeCards/HomePharma';
import HomeMutuelle from './HomeCards/HomeMutuelle';
import UserList from "./Admin/UserList";

const Home = ({ setNom, setRole, setCode, setConnected, role }) => {
    switch (role) {
        case 'medecin':
            return (
                <div className="home">
                    <HomeMedecin role={role} />
                </div>
            );
            break;
        case 'client':
            return (
                <div className="home">
                    <List role={role} />
                </div>
            );
            break;
        case 'mutuelle':
            return (
                <div className="home">
                    <HomeMutuelle role={role} />
                </div>
            );
            break;
        case 'pharma':
            return (
                <div className="home">
                    <HomePharma role={role} />
                </div>
            );
            break;
        case 'admin':
            return (
                <div className="home">
                    <UserList role={role} />
                </div>
            );
            break;
        default:
            return (
                <div className="home">
                    <Login setNom={setNom} setRole={setRole} setCode={setCode} setConnected={setConnected} role={role} />
                </div>
            );
    }
};

export default Home;
