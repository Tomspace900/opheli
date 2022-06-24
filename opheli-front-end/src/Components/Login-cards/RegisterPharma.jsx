import React from 'react';
import { useState } from 'react';

const RegisterPharma = ({ account }) => {
    // Donnees a envoyer à la BDD
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');
    const [nomPharma, setNomPharma] = useState('');
    const [street, setStreet] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    // Constante booleenne a utiliser pour envoyer les donnees
    const [submitted, setSubmitted] = useState(false);

    const handleFirstname = (e) => {
        setFirstname(e.target.value);
        setSubmitted(false);
    };

    const handleSurname = (e) => {
        setSurname(e.target.value);
        setSubmitted(false);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    const handleId = (e) => {
        setId(e.target.value);
        setSubmitted(false);
    };

    const handleAddress = (e) => {
        setAddress(e.target.value);
        setSubmitted(false);
    };

    const handleNomPharma = (e) => {
        setNomPharma(e.target.value);
        setSubmitted(false);
    };

    const handleStreet = (e) => {
        setStreet(e.target.value);
        setSubmitted(false);
    };

    const handleZipCode = (e) => {
        setZipcode(e.target.value);
        setSubmitted(false);
    };

    const handleCity = (e) => {
        setCity(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
        console.log(e.target.value);
        setSubmitted(false);
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
            alert('Tout les champs sont obligatoires');
        } else if (!email.includes('@')) {
            alert('Email incorrect');
        } else if (id.length !== 11 || /[a-zA-Z]/.test(id)) {
            alert('Le numéro RPPS est incorrect');
        } else if (password !== repeatPassword) {
            alert('Les mots de passes ne sont pas identiques');
        } else if (password.length < 8) {
            alert('Votre mot de passe doit contenir au moins 8 caractères');
        } else {
            setSubmitted(true);
            alert('Ça envoie');
        }
    };

    return (
        <form className="register-form">
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
            <div className="register-form-line">
                <div className="register-form-blockline">
                    <div className="register-label-nompharma">
                        <label>Adresse de votre pharmacie :</label>
                    </div>
                    <div className="register-input-nompharma">
                        <input type="text" onChange={handleNomPharma} />
                    </div>
                </div>
            </div>
            <br />
            <span>OU</span>
            <br />
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
                    {/* Integrer l'insertion a la base de donnée */}
                    S'inscrire
                </button>
            </div>
        </form>
    );
};

export default RegisterPharma;
