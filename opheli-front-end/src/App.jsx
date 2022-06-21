import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import './CSS/Reset.css';
import './CSS/App.css';
import Login from './Components/Login';
import Form_test from "./Components/Form_test";
import List from "./Components/List";
import UserList from "./Components/Admin/UserList";

const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/test" element={<Form_test/>} />
                    <Route path="/list" element={<List/>} />
                    <Route path="/users" element={<UserList/>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
