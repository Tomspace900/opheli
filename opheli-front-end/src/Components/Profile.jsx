import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Profile.css';
import { useState } from 'react';
import Axios from "axios";
import {useNavigate} from "react-router-dom";

function mouseOver(e) {
    e.target.style.background = '#5ccdc4a9';
}
function mouseOut(e) {
    e.target.style.background = '';
}

const ProfileInfos = () => {
    const [ask, setAsked] = useState(false);
    const [liste, setListe] = useState('');

    if (!ask) {
        Axios.get('http://localhost:8080/profil').then(response => {
            setListe(response.data[0])
            setAsked(true)
        })
    }

    return (
        <div className="profile-card">
            <div className="profile-attribute">
                <span>Nom : </span>
                <span>{liste.Nom}</span>
                <br/>
                <span>Prénom : </span>
                <span>{liste.Prenom}</span>
                <br/>
                <span>Adresse Mail : </span>
                <span>{liste.Mail}</span>
                <br/>
                <span>Sexe : </span>
                <span>Sexe à insérer</span>
                <br/>
                <span>Taille : </span>
                <span> à insérer</span>
            </div>
            <div className="profile-img">
                <img src = "https://cdn-icons-png.flaticon.com/512/1250/1250689.png"></img>
            </div>
        </div>
    );
};

const ProfileOptions = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [repeatPassword, setRepeatPassword] = useState('');
const [height, setHeight] = useState('');
const [healthinsurance, setHealthInsurance] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

const handleEmail = (e) => {
    setEmail(e.target.value);
};

const handlePassword = (e) => {
    setPassword(e.target.value);
};


const handleRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
};

const handleHeight = (e) => {
    setHeight(e.target.value);
};

const handleHealthInsurance =(e) => {
    setHealthInsurance(e.target.value);
}

const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (
        password === '' ||
        repeatPassword === ''
    ) {
        alert('Tout les champs sont obligatoires');
    } else if (password !== repeatPassword) {
        alert('Les mots de passes ne sont pas identiques');
    } else if (password.length < 8) {
        alert('Votre mot de passe doit contenir au moins 8 caractères');
    } else {
        Axios.post(
            'http://localhost:8080/client',
            {
                mdp : password
            }
        ).then(response => {
            console.log(response.data)
            if (response.data == 'success') {
                navigate('/List')
            } else {
                setError(response.data)
            }
        });
    }
};

const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (
       
        email === ''
    ) {
        alert('Tout les champs sont obligatoires');
    } else if (!email.includes('@')) {
        alert('Email incorrect');
    } else {
        Axios.post(
            'http://localhost:8080/client',
            {
                mail: email, 
            }
        ).then(response => {
            console.log(response.data)
            if (response.data == 'success') {
                navigate('/List')
            } else {
                setError(response.data)
            }
        });
    }
}
    const handleSubmitHeight = (e) => {
        e.preventDefault();
        if (
           
            height === ''
        ) {
            alert('Tout les champs sont obligatoires');
        } else if (!typeof(height)==Number || height<0) {
            alert('Taille incorrecte');
        } else {
            Axios.post(
                'http://localhost:8080/client',
                {
                    taille: height, 
                }
            ).then(response => {
                console.log(response.data)
                if (response.data == 'success') {
                    navigate('/List')
                } else {
                    setError(response.data)
                }
            });
        }
};

const handleSubmitHealthInsurance = (e) => {
    e.preventDefault();
    if (
       
        healthinsurance === ''
    ) {
        alert('Tout les champs sont obligatoires');
    }  else {
        Axios.post(
            'http://localhost:8080/client',
            {
                mutuelle: healthinsurance, 
            }
        ).then(response => {
            console.log(response.data)
            if (response.data == 'success') {
                navigate('/List')
            } else {
                setError(response.data)
            }
        });
    }
};

    return(
        <div className='profile-options'>
            <div className='update'>
                    <div className='update-height'>
                        <span>Changer la taille</span><br></br>
                        <input type="number" id='height' placeholder='Taille en cm' onChange={handleHeight}></input>
                        <button id='change-height' onClick={handleSubmitHeight}>Valider</button>
                    </div>
                
                    <div className='update-password'>
                        <span>Modifier mot de passe</span><br></br>
                        <input type="password" id='password' placeholder='Mot de passe' onChange={handlePassword}></input><br></br>
                        <span>Répéter mot de passe</span><br></br>
                        <input type="password" id='repeat-password' placeholder='Mot de passe' onChange={handleRepeatPassword}></input><br></br>
                        <button id="change-password" onClick={handleSubmitPassword}>Valider</button>
                    </div>
                    
                    <div className='update-email'>
                        <span>Modifier adresse mail</span><br></br>
                        <input type="email" id='email' placeholder='Adresse Mail' onChange={handleEmail}></input>
                        <button id='change-email' onClick={handleSubmitEmail}>Valider</button>
                    </div>  

                      
            </div>

                <div className='right-column'>
                
                    <div className='list-health-insurance'>
                    <span>Nom des mutuelles à afficher</span>
                    </div>

                    <div className='add-health-insurance'>
                        <span>Ajouter mutuelle</span><br></br>
                        <input type="text" id='health-insurance' placeholder='Nom mutuelle' onChange={handleHealthInsurance}></input><br></br>
                        <button id='add-health-insurance' onClick={handleSubmitHealthInsurance}>Valider</button>
                    </div>  
                
                </div>
                
        </div>
    )
    }

const MyOrdo = () => {
    return(
        <div className='my-ordo'>
            <Link to={'/ordonnance'} className="my-ordonnances-button" onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                <span>Mes ordonnances</span>
            </Link>
        </div>
    )
}

const DeleteAccount = () => {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    
    
    const handleRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        if (
            password === '' ||
            repeatPassword === ''
        ) {
            alert('Tout les champs sont obligatoires');
        } else if (password !== repeatPassword) {
            alert('Les mots de passes ne sont pas identiques');
        } else if (password.length < 8) {
            alert('Votre mot de passe doit contenir au moins 8 caractères');
        } else {
            Axios.post(
                'http://localhost:8080/client',
                {
                    mdp : password
                }
            ).then(response => {
                console.log(response.data)
                if (response.data == 'success') {
                    navigate('/List')
                } else {
                    setError(response.data)
                }
            });
        }
    };

    return(
        <div className='delete-account'>
            <span>Suppression de compte</span><br></br>
            <input type="password" id='password' placeholder='Mot de passe' onChange={handlePassword}></input><br></br>
            <span>Répétez votre mot de passe</span><br></br>
            <input type="password" id='repeat-password' placeholder='Mot de passe' onChange={handleRepeatPassword}></input><br></br>
            <button id="change-password" onClick={handleSubmitPassword}>Supprimer le compte</button>
        </div>
    )
}

const Profile = () => {
    
    return (
        <div className='profile'>
            <h1 className='profile-title'>Profil</h1>
            <ProfileInfos/>
            <ProfileOptions/>
            <MyOrdo/>
            <DeleteAccount/>
        
            

        </div>
    );
};



export default Profile;

