import '../CSS/Contact.css';
import React from 'react';
import { useState } from 'react';

function mouseOver(e) {
    e.target.style.background = '#5ccdc4a9';
}
function mouseOut(e) {
    e.target.style.background = '';
}

const ContactCard = () => {

const ref = React.useRef(null);
const [map, setMap] = React.useState();

React.useEffect(() => {
  if (ref.current && !map) {
    setMap(new window.google.maps.Map(ref.current, {}));
  }
}, [ref, map]);


    return(
        <div className='contact-card'>
            <div className='contact-infos'>
                <span>Opheli</span>
                <div>+33x.xx.xx.xx.xx</div>
                <div>Mail</div>
                <div>30 Av. de la République, 94800 Villejuif</div>

            </div>
        </div>
    )
}
const Request = () => {
    const [request, setRequest] = useState('');
    const [email, setEmail] = useState('');

    const handleRequest = (e) => {
        setRequest(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmitRequest = (e) => {
        e.preventDefault();
        if (

            request === ''
        ) {
            alert('Veuillez saisir un message');
        }  
        e.preventDefault();
        if (

            email === ''
        ) {
            alert("Veuillez saisir l'email");
        } else if (!email.includes('@')) {
            alert('Email incorrect');
        }
        alert("Message envoyé !");
    };

    
    return(
        <div className='request'>
            <span>Entrez votre adresse mail :</span>
            <input type="text" placeholder='Mail' onChange={handleEmail}/>
            <textarea type="text" placeholder='Ecrivez votre message...' onChange={handleRequest}/>
            <button onClick={handleSubmitRequest}  onMouseEnter={mouseOver} onMouseLeave={mouseOut}>Envoyer la demande</button>
        </div>
    )
}
const Contact = () => {
    
    return (
        <div className='contact'>
            <h1 className='contact-title'>Contacts</h1>
            <ContactCard/>
            <Request/>
        </div>
    );
};



export default Contact;