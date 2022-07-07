import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './CSS/Reset.css';
import './CSS/App.css';
import './CSS/Index.css';
import './CSS/Form.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import List from './Components/List';
import CreateOrdo from './Components/CreateOrdo';
import Profil from './Components/Profile';
import Contact from './Components/Contact';
import Ordonnance from './Components/Ordonnance';
import Error from './Components/Error';
import ListeClients from './Components/Mutuelle/ListeClients';
import UserList from './Components/Admin/UserList';
import HomePharma from './Components/HomeCards/HomePharma';
import LoginAdmin from './Components/Admin/LoginAdmin';

const App = () => {
    const [nom, setNom] = useState('');
    const [code, setCode] = useState(''); // Num de secu ou RPPS
    const [id, setId] = useState(''); // Id d'utilisateur
    const [role, setRole] = useState('');
    const [connected, setConnected] = useState(false);

    /* function handleConnect() {
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
    setInterval(handleConnect, 1000); */

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
                    <Route
                        path="/admin"
                        element={<LoginAdmin setNom={setNom} setRole={setRole} setCode={setCode} setConnected={setConnected} />}
                    />
                    <Route path="/list" element={<List role={role} />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/profil" element={<Profil role={role} />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/createordo" element={<CreateOrdo role={role} idMedecin={code} />} />
                    <Route path="/ordonnance/:idOrdo" element={<Ordonnance role={role} />} />
                    <Route path="/listeClients" element={<ListeClients role={role} />} />
                    <Route path="/error" element={<Error />} />
                    <Route path="/listeUtilisateurs" element={<UserList />} />
                    <Route path="/homepharma" element={<HomePharma />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
