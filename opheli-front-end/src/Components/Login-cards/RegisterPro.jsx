import React from 'react';
import { useState } from 'react';

const RegisterPro = () => {
    // Donnees a envoyer à la BDD
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');
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
            address === '' ||
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
            alert('Ça marche');
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
            <div className="register-form-line">
                <div className="register-form-blockline">
                    <div className="register-label-address">
                        <label>Adresse de votre établissement :</label>
                    </div>
                    <div className="register-input-address">
                        <input type="text" onChange={handleAddress} />
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
                    }}>
                    S'inscrire
                </button>
            </div>
        </form>
    );
};

export default RegisterPro;
