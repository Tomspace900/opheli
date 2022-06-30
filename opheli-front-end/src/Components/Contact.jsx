import '../CSS/Contact.css';
import React from 'react';

import { Wrapper, Status } from "@googlemaps/react-wrapper";



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
                <span>Opheli</span><br></br>
                <span>Tel :</span><br></br>
                <span>Mail</span><br></br>
                <span>30 Av. de la République, 94800 Villejuif</span>

            </div>
            <div className='contact-map'>
                <span>Map here</span>

            </div>

        </div>
    )
}
const Request = () => {
    return(
        <div className='request'>
            <input type="text" placeholder='Ecrivez votre message...' />
            <button>Envoyer la demande</button>
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