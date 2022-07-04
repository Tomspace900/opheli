import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import './CSS/Reset.css';
import './CSS/App.css';
import './CSS/Index.css';
import './CSS/Form.css';
import Login from './Components/Login';
import List from './Components/List';
import UserList from './Components/Admin/UserList';
import CreateOrdo from './Components/CreateOrdo';
import Profil from './Components/Profile';
import Contact from './Components/Contact';
import Ordonnance from './Components/Ordonnance';
import Error from './Components/Error';
import ListeClients from './Components/Mutuelle/ListeClients';
import ListeOrdonnances from './Components/List';
import { useState } from 'react';

const App = () => {
    const [nom, setNom] = useState('');
    const [code, setCode] = useState('');
    const [id, setId] = useState('');
    const [role, setRole] = useState('');
    const [idOrdo, setIdOrdo] = useState('');
    const [connected, setConnected] = useState(false);

    /*
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
    setInterval(handleConnect, 1000);*/

    return (
        <div className="app">
            <BrowserRouter>
                <Header
                    nom={nom}
                    connected={connected}
                    setId={setId}
                    setNom={setNom}
                    setRole={setRole}
                    setCode={setCode}
                    setConnected={setConnected}
                    role={role}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home setNom={setNom} setRole={setRole} setCode={setCode} setConnected={setConnected} role={role} />
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Home setNom={setNom} setRole={setRole} setCode={setCode} setConnected={setConnected} role={role} />
                        }
                    />
                    <Route
                        path="/login"
                        element={<Login setNom={setNom} setRole={setRole} setCode={setCode} setConnected={setConnected} />}
                    />
                    <Route path="/list" element={<List role={role} />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/profil" element={<Profil role={role} />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/createordo" element={<CreateOrdo role={role} idMedecin={code} />} />
                    <Route path="/ordonnance" element={<Ordonnance role={role} />} />
                    <Route path="/listeClients" element={<ListeClients role={role} />} />
                    <Route path="/listeOrdonnances" element={<ListeOrdonnances role={role} />} />
                    <Route path="/error" element={<Error />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
