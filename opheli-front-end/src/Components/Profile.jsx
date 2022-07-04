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

const ProfileInfos = ({role}) => {
    const [ask, setAsked] = useState(false);
    const [liste, setListe] = useState([]);
    const [sexe, setSexe] = useState(0);
    const [taille,setTaille] = useState(0);

    if (ask === false) {
        askDB()
    }

    function askDB() {
        Axios.get('http://localhost:8080/profil').then(response => {
            setListe(response.data[0])
            setAsked(true)
        })
    }

    if (role == 'client') {
        return (
            <div className="profile-card">
                <div className="profile-attribute">
                    <div>Nom : <span>{liste.NomUtilisateur}</span></div>
                    <div>Prénom : <span>{liste.PrenomUtilisateur}</span></div>
                    <div>Adresse Mail : <span>{liste.Mail}</span></div>
                    <div>Taille : <span>{liste.Taille}</span></div>
                </div>
                <div className="profile-img">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="7" r="4" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                </div>
            </div>
        );
    } else if (role == 'medecin' || role == 'pharmacien') {
        return (
            <div className="profile-card">
                <div className="profile-attribute">
                    <div>Nom : <span>{liste.NomUtilisateur}</span></div>
                    <div>Prénom : <span>{liste.PrenomUtilisateur}</span></div>
                    <div>Adresse Mail : <span>{liste.Mail}</span></div>
                </div>
                <div className="profile-img">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="7" r="4" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                </div>
            </div>
        );
    }
};

const ProfileOptions = ({role}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [height, setHeight] = useState('');
    const [healthinsurance, setHealthInsurance] = useState('');
    const [liste, setListe] = useState([]);
    const [ask,setAsk] = useState('')
    const navigate = useNavigate();

    if (ask === false) {
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
                if (response.data === 'success') {
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
                if (response.data === 'success') {
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
        } else if (!typeof(height)===Number || height<0) {
            alert('Taille incorrecte');
        } else {
            Axios.post(
                'http://localhost:8080/taille',
                {
                    taille: height,
                }
            ).then(response => {
                if (response.data === 'success') {
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
                if (response.data === 'success') {
                    navigate('/profil')
                }
            });
        }
    };

    if (role == 'client') {
        return(
            <div className='profile-options'>
                <div className='update'>
                    <div className='update-height'>
                        <div className='part-title'>Modifier votre taille</div>
                        <input type="number" id='height' placeholder='Taille en cm' onChange={handleHeight}></input>
                        <button id='change-height' onClick={handleSubmitHeight} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>Valider</button>
                    </div>
                    <div className='update-password'>
                        <div className='part-title'>Modifier votre mot de passe</div>
                        <span>Ancien mot de passe</span><br></br>
                        <input type="password" id='password' placeholder='Mot de passe' onChange={handlePassword}></input><br></br>
                        <span>Nouveau mot de passe</span><br></br>
                        <input type="password" id='repeat-password' placeholder='Mot de passe' onChange={handleRepeatPassword}></input><br></br>
                        <button id="change-password" onClick={handleSubmitPassword} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>Valider</button>
                    </div>
                    <div className='update-email'>
                        <div className='part-title'>Modifier votre adresse mail</div>
                        <input type="email" id='email' placeholder='Adresse Mail' onChange={handleEmail}></input>
                        <button id='change-email' onClick={handleSubmitEmail} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>Valider</button>
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
                        <div>Ajouter une mutuelle</div>
                        <input type="text" id='health-insurance' placeholder='Nom mutuelle' onChange={handleHealthInsurance}></input><br></br>
                        <button id='add-health-insurance' onClick={handleSubmitHealthInsurance} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>Valider</button>
                    </div>

                </div>

            </div>
        )
    } else {
        return(
            <div className='profile-options'>
                <div className='update'>
                    <div className='update-password'>
                        <div className='part-title'>Modifier votre mot de passe</div>
                        <span>Ancien mot de passe</span><br></br>
                        <input type="password" id='password' placeholder='Mot de passe' onChange={handlePassword}></input><br></br>
                        <span>Nouveau mot de passe</span><br></br>
                        <input type="password" id='repeat-password' placeholder='Mot de passe' onChange={handleRepeatPassword}></input><br></br>
                        <button id="change-password" onClick={handleSubmitPassword} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>Valider</button>
                    </div>
                    <div className='update-email'>
                        <div className='part-title'>Modifier votre adresse mail</div>
                        <input type="email" id='email' placeholder='Adresse Mail' onChange={handleEmail}></input>
                        <button id='change-email' onClick={handleSubmitEmail} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>Valider</button>
                    </div>
                    <div className='delete-account'>
                        <h1>Suppression de compte</h1>
                        <div>Veuillez saisir votre mot de passe :</div>
                        <input type="password" id='password' placeholder='Mot de passe' onChange={handlePassword}></input><br></br>
                        <div>Répétez votre mot de passe</div>
                        <input type="password" id='repeat-password' placeholder='Mot de passe' onChange={handleRepeatPassword}></input><br></br>
                        <button id="change-password" onClick={handleSubmitPassword} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>Supprimer le compte</button>
                    </div>
                </div>
            </div>

        )
    }
}

/*
const MyOrdo = () => {
    return(
        <div className='my-ordo'>
            <Link to={'/ordonnance'} className="my-ordonnances-button" onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                <span>Mes ordonnances</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-text" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <line x1="9" y1="9" x2="10" y2="9" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="15" y2="17" />
                </svg>
            </Link>
        </div>
    )
}*/

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
                if (response.data === 'success') {
                    navigate('/List')
                } else {
                    setError(response.data)
                }
            });
        }
    };

    return(
        <div className='delete-account'>
            <h1>Suppression de compte</h1>
            <div>Veuillez saisir votre mot de passe :</div>
            <input type="password" id='password' placeholder='Mot de passe' onChange={handlePassword}></input><br></br>
            <div>Répétez votre mot de passe</div>
            <input type="password" id='repeat-password' placeholder='Mot de passe' onChange={handleRepeatPassword}></input><br></br>
            <button id="change-password" onClick={handleSubmitPassword} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>Supprimer le compte</button>
        </div>
    )
}

const Profile = ({role}) => {
    const navigate = useNavigate();

    if (role === '') {navigate('/Error')}

    return (
        <div className='profile'>
            <h1 className='profile-title'>Profil</h1>
            <ProfileInfos role={role}/>
            <ProfileOptions role={role}/>
            <DeleteAccount/>



        </div>
    );
};



export default Profile;

