import React from 'react';
import { useState } from 'react';

const RegisterClient = () => {
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    // Constante booleenne a utiliser pour envoyer les donnees
    const [submitted, setSubmitted] = useState(false);

    const handleFirstname = (e) => {
        setFirstname(e.target.value);
        console.log(e.target.value);
        setSubmitted(false);
    };

    const handleSurname = (e) => {
        setSurname(e.target.value);
        console.log(e.target.value);
        setSubmitted(false);
    };

    const handleBirthdate = (e) => {
        setBirthdate(e.target.value);
        console.log(e.target.value);
        setSubmitted(false);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        console.log(e.target.value);
        setSubmitted(false);
    };

    const handleId = (e) => {
        setId(e.target.value);
        console.log(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        console.log(e.target.value);
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
            birthdate === '' ||
            email === '' ||
            id === '' ||
            password === '' ||
            repeatPassword === ''
        ) {
            alert('Tout les champs sont obligatoires');
        } else if (password !== repeatPassword) {
            alert('Les mots de passes ne sont pas identiques');
        } else if (password.length < 8) {
            alert('Votre mot de passe doit contenir au moins 8 caractères');
        } else if (id.length !== 13) {
            alert('Le numéro de sécurité sociale est incorrect');
        } else {
            setSubmitted(true);
            alert('Ça marche');
        }
    };

    function mouseOver(e) {
        e.target.style.color = '#5ccdc4a9';
        e.target.style.border = 'solid #5ccdc4 1px';
    }
    function mouseOut(e) {
        e.target.style.color = '#4a565a';
        e.target.style.border = 'solid #4a565a 1px';
    }
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
                    <div className="register-label-date">
                        <label>Date de naissance :</label>
                    </div>
                    <div className="register-input-date">
                        <input type="date" onChange={handleBirthdate} />
                    </div>
                </div>
                <div className="register-form-blockdoubleline">
                    <div className="register-label-mail">
                        <label>Adresse mail :</label>
                    </div>
                    <div className="register-input-id">
                        <input type="mail" placeholder="mehdi.demille@exemple.fr" onChange={handleEmail} />
                    </div>
                </div>
            </div>
            <div className="register-form-line">
                <div className="register-form-blockline">
                    <div className="register-label-id">
                        <label>Numero sécurité sociale :</label>
                    </div>
                    <div className="register-input-id">
                        <input type="text" placeholder="1234567890123" onChange={handleId} />
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
                    onMouseEnter={mouseOver}
                    onMouseLeave={mouseOut}
                    onClick={handleSubmit}>
                    {/* Integrer l'insertion a la base de donnée */}
                    S'inscrire
                </button>
            </div>
        </form>
    );
};

export default RegisterClient;
