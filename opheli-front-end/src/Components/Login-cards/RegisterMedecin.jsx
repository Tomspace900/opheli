import React from 'react';
import { useState } from 'react';
import Axios from "axios";
import {useNavigate} from "react-router-dom";

const RegisterMedecin = ({ account }) => {
    // Donnees a envoyer à la BDD
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');
    const [street, setStreet] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFirstname = (e) => {
        setFirstname(e.target.value);
    };

    const handleSurname = (e) => {
        setSurname(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleId = (e) => {
        setId(e.target.value);
    };

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleStreet = (e) => {
        setStreet(e.target.value);
    };

    const handleZipCode = (e) => {
        setZipcode(e.target.value);
    };

    const handleCity = (e) => {
        setCity(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            firstname === '' ||
            surname === '' ||
            email === '' ||
            id === '' ||
            (address === '' && (street === '' || zipcode === '' || city === '')) ||
            password === '' ||
            repeatPassword === ''
        ) {
            setError('Tout les champs sont obligatoires');
        } else if (!email.includes('@')) {
            setError('Email incorrect');
        } else if (id.length !== 11 || /[a-zA-Z]/.test(id)) {
            setError('Le numéro RPPS est incorrect');
        } else if (password !== repeatPassword) {
            setError('Les mots de passes ne sont pas identiques');
        } else if (password.length < 8) {
            setError('Votre mot de passe doit contenir au moins 8 caractères');
        } else {
            Axios.post(
                'http://localhost:8080/prescripteur',
                {
                    nom: surname,
                    prenom: firstname,
                    mail: email,
                    rpps : id,
                    rue :street,
                    code : zipcode,
                    ville : city,
                    mdp : password
                }).then(response => {
                    if (response.data == 'success') {
                        navigate('/List')
                    } else {
                        setError(response.data)
                    }
                });
        }
    };

    return (
        <form
            className="register-form"
            // action="http://localhost/opheli/opheli-back-end/PHP/login/login_pro.php"
            // method="post"
            // onSubmit={(event) => handleSumbit(event)}
        >
            <div className="register-form-doubleline">
                <div className="register-form-blockdoubleline">
                    <div className="register-label-firstname">
                        <label>Prénom :</label>
                    </div>
                    <div className="register-input-firstname">
                        <input type="text" placeholder="Mehdi" onChange={handleFirstname} />
                    </div>
                </div>
                <div className="register-form-blockdoubleline">
                    <div className="register-label-surname">
                        <label>Nom :</label>
                    </div>
                    <div className="register-input-surname">
                        <input type="text" placeholder="Demille" onChange={handleSurname} />
                    </div>
                </div>
            </div>
            <div className="register-form-doubleline">
                <div className="register-form-blockdoubleline">
                    <div className="register-label-mail">
                        <label>Adresse mail :</label>
                    </div>
                    <div className="register-input-mail">
                        <input type="mail" placeholder="mehdi.demille@exemple.fr" onChange={handleEmail} />
                    </div>
                </div>
                <div className="register-form-blockdoubleline">
                    <div className="register-label-id">
                        <label>Numero RPPS :</label>
                    </div>
                    <div className="register-input-id">
                        <input type="text" placeholder="12345678901" onChange={handleId} />
                    </div>
                </div>
            </div>
            <div className="register-form-doubleline">
                <div className="register-form-blockdoubleline">
                    <div className="login-label-pwd">
                        <label>Mot de passe :</label>
                    </div>
                    <div className="register-input-pwd">
                        <input type="password" onChange={handlePassword} />
                    </div>
                </div>
                <div className="register-form-blockdoubleline">
                    <div className="login-label-rpwd">
                        <label>Répéter mot de passe :</label>
                    </div>
                    <div className="register-input-rpwd">
                        <input type="password" onChange={handleRepeatPassword} />
                    </div>
                </div>
            </div>
            <div className="register-form-tripleline">
                <div className="register-form-blocktripleline">
                    <div className="register-label-street">
                        <label>Numéro et voie :</label>
                    </div>
                    <div className="register-input-street">
                        <input type="text" placeholder="1 rue de Paris" onChange={handleStreet} />
                    </div>
                </div>
                <div className="register-form-blocktripleline">
                    <div className="register-label-zipcode">
                        <label>Code postal :</label>
                    </div>
                    <div className="register-input-zipcode">
                        <input type="text" placeholder="75000" onChange={handleZipCode} />
                    </div>
                </div>
                <div className="register-form-blocktripleline">
                    <div className="register-label-city">
                        <label>Ville :</label>
                    </div>
                    <div className="register-input-city">
                        <input type="text" placeholder="Paris" onChange={handleCity} />
                    </div>
                </div>
            </div>
            <div className="register-submit">
                <button
                    type="button"
                    className="register-box-submit"
                    onMouseEnter={(e) => {
                        e.target.style.color = '#5ccdc4a9';
                        e.target.style.border = 'solid #5ccdc4 1px';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = '#4a565a';
                        e.target.style.border = 'solid #4a565a 1px';
                    }}
                onClick={handleSubmit}>
                    S'inscrire
                </button>
            </div>
            <div>
                {error}
            </div>
        </form>
    );
};

export default RegisterMedecin;
