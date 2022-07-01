import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import './CSS/Reset.css';
import './CSS/App.css';
import './CSS/Index.css';
import Login from './Components/Login';
import Form_test from './Components/Form_test';
import List from './Components/List';
import UserList from './Components/Admin/UserList';
import CreateOrdo from './Components/CreateOrdo';
import UpdateOrdo from './Components/UpdateOrdo';
import Parameters from './Components/Parameters';
import Profile from './Components/Profile';
import Contact from './Components/Contact';
import Ordonnance from './Components/Ordonnance';
import Error from './Components/Error';
import ListeClients from './Components/ListeClients';
import { useState } from 'react';
import Axios from 'axios';

const App = () => {
    const [nom, setNom] = useState('');
    const [code, setCode] = useState('');
    const [id, setId] = useState('');
    const [role, setRole] = useState('');
    const [connected, setConnected] = useState(false);

    function handleConnect() {
        if (!connected) {
            Axios.get('http://localhost:8080/infos').then((response) => {
                setNom(response.data.nom);
                setRole(response.data.role);
                setCode(response.data.code);
                setId(response.data.id);
                if (nom != '') {
                    setConnected(true);
                }
            });
        }
    }
    setInterval(handleConnect, 1000);

    return (
        <div className="app">
            <BrowserRouter>
                <Header nom={nom} connected={connected} setConnected={setConnected} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/test" element={<Form_test />} />
                    <Route path="/list" element={<List />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/profil" element={<Profile />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/createordo" element={<CreateOrdo idMedecin={code} />} />
                    <Route path="/updateordo" element={<UpdateOrdo />} />
                    <Route path="/parametres" element={<Parameters />} />
                    <Route path="/ordonnance" element={<Ordonnance nomMedecin={nom} />} />
                    <Route path="/listeClients" element={<ListeClients />} />
                    <Route path="/error" element={<Error />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
