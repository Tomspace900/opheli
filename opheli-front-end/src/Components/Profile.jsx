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
    const [liste, setListe] = useState([]);
    const [sexe, setSexe] = useState(0);
    const [taille,setTaille] = useState(0);

    if (ask == false) {
        askDB()
    }

    function askDB() {
        Axios.get('http://localhost:8080/profil').then(response => {
            setListe(response.data[0])
            setAsked(true)
        })
    }

    return (
        <div className="profile-card">
            <div className="profile-attribute">
                <span>Nom : </span>
                <span>{liste.NomUtilisateur}</span>
                <br/>
                <span>Prénom : </span>
                <span>{liste.PrenomUtilisateur}</span>
                <br/>
                <span>Adresse Mail : </span>
                <span>{liste.Mail}</span>
                <br/>
                <span>Taille : </span>
                <span>{liste.Taille}</span>
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
    const [liste, setListe] = useState([]);
    const [ask,setAsk] = useState('')
    const navigate = useNavigate();

    if (ask == false) {
        Axios.get('http://localhost:8080/listeMutuelles').then((response) => {
            setListe(response.data)
            setAsk(true)
        })
    }

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
                    navigate('/Profile')
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
                'http://localhost:8080/email',
                {
                    mail: email,
                }
            ).then(response => {
                if (response.data == 'success') {
                    navigate('/List')
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
                'http://localhost:8080/taille',
                {
                    taille: height, 
                }
            ).then(response => {
                if (response.data == 'success') {
                    navigate('/profil')
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
                'http://localhost:8080/ajoutMutuelle',
                {
                    mutuelle: healthinsurance,
                }
            ).then(response => {
                if (response.data == 'success') {
                    navigate('/profil')
                }
            });
        }
    };

    return(
        <div className='profile-options'>
            <div className='update'>
                    <div className='update-height'>
                        <span className='part-title'>Modifier votre taille</span><br></br>
                        <input type="number" id='height' placeholder='Taille en cm' onChange={handleHeight}></input>
                        <button id='change-height' onClick={handleSubmitHeight}>Valider</button>
                    </div>
                
                    <div className='update-password'>
                        <span className='part-title'>Modifier votre mot de passe</span><br></br>
                        <span>Ancien mot de passe</span><br></br>
                        <input type="password" id='password' placeholder='Mot de passe' onChange={handlePassword}></input><br></br>
                        <span>Nouveau mot de passe</span><br></br>
                        <input type="password" id='repeat-password' placeholder='Mot de passe' onChange={handleRepeatPassword}></input><br></br>
                        <button id="change-password" onClick={handleSubmitPassword}>Valider</button>
                    </div>
                    
                    <div className='update-email'>
                        <span className='part-title'>Modifier votre adresse mail</span><br></br>
                        <input type="email" id='email' placeholder='Adresse Mail' onChange={handleEmail}></input>
                        <button id='change-email' onClick={handleSubmitEmail}>Valider</button>
                    </div>  

                      
            </div>

                <div className='right-column'>
                    <div className='part-title'>Vos mutuelles</div>
                    <div className='list-health-insurance'>
                        <div>
                            {liste.map(item => {
                                return (
                                    <div>{item.NomMutuelle}</div>
                                );
                            })}
                        </div>
                    </div>

                    <div className='add-health-insurance'>
                        <span>Ajouter une mutuelle</span><br></br>
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

