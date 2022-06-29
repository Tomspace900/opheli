import React from 'react';
import { useState } from 'react';
import Axios from "axios";
import {useNavigate} from "react-router-dom";

const RegisterMutuelle = ({ account }) => {
    // Donnees a envoyer à la BDD
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [identifiant, setId] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Constante booleenne a utiliser pour envoyer les donnees
    const [submitted, setSubmitted] = useState(false);

    const handleCode = (e) => {
        setCode(e.target.value);
    };

    const handleName = (e) => {
        setName(e.target.value);
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
        if (name === '' || email === '' || identifiant === '' || password === '' || repeatPassword === '') {
            setError('Tout les champs sont obligatoires');
        } else if (!email.includes('@')) {
            setError('Email incorrect');
        } else if (password !== repeatPassword) {
            setError('Les mots de passes ne sont pas identiques');
        } else if (password.length < 8) {
            setError('Votre mot de passe doit contenir au moins 8 caractères');
        } else {
            setSubmitted(true);
            Axios.post(
                'http://localhost:8080/mutuelle',
                {
                    nom: name,
                    mail: email,
                    identifiant : identifiant,
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
        <form className="register-form">
            <div className="register-form-line">
                <div className="register-form-blockline">
                    <div className="register-label-nompharma">
                        <label>Afin de créer un compte professionnel, un code est nécessaire. Veuillez prouver votre identité auprès des administrateurs d'Opheli en envoyant un mail à l'adresse suivante :</label><br/><br/>
                        <label>Code :</label>
                    </div>
                    <div className="register-input-nompharma">
                        <input type="text" onChange={handleCode} />
                    </div>
                </div>
            </div>
            <div className="register-form-doubleline">
                <div className="register-form-blockdoubleline">
                    <div className="register-label-firstname">
                        <label>Nom :</label>
                    </div>
                    <div className="register-input-firstname">
                        <input type="text" placeholder="Mehdi Mutuelle" onChange={handleName} />
                    </div>
                </div>
                <div className="register-form-blockdoubleline">
                    <div className="register-label-surname">
                        <label>Identifiant :</label>
                    </div>
                    <div className="register-input-surname">
                        <input type="text" placeholder="mehdimutuelle123" onChange={handleId} />
                    </div>
                </div>
            </div>
            <div className="register-form-line">
                <div className="register-form-blockline">
                    <div className="register-label-nompharma">
                        <label>Adresse mail :</label>
                    </div>
                    <div className="register-input-mail">
                        <input type="mail" placeholder="mehdi.demile@exemple.fr" onChange={handleEmail} />
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

export default RegisterMutuelle;
