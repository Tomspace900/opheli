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
import Ordonnance from './Components/Ordonnance';

const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/test" element={<Form_test />} />
                    <Route path="/list" element={<List />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/profil" element={<Profile />} />
                    <Route path="/createordo" element={<CreateOrdo />} />
                    <Route path="/updateordo" element={<UpdateOrdo />} />
                    <Route path="/parametres" element={<Parameters />} />
                    <Route path="/ordonnance" element={<Ordonnance />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
