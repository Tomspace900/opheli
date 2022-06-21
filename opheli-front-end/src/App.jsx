import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import './CSS/Reset.css';
import './CSS/App.css';
import Login from './Components/Login';
import Form_test from './Components/Form_test';
import List from './Components/List';
import UserList from './Components/Admin/UserList';
import CreateOrdo from './Components/CreateOrdo';
import UpdateOrdo from './Components/UpdateOrdo';

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
                    <Route path="/createordo" element={<CreateOrdo />} />
                    <Route path="/updateordo" element={<UpdateOrdo />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
