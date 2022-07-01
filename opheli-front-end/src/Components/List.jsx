import React, { useState } from 'react';
import '../CSS/List.css';
import '../CSS/Login.css';
import Axios from "axios";
import {useNavigate} from "react-router-dom";

function List({role}) {
    const [access, setAccess] = useState(false);
    const navigate = useNavigate();

    if (role  == '') {navigate('/Error')}

    //TODO ça c'était pour mes tests c'est pas final je pense -Clovis
    //const [id, setId] = useState(12354698351);
    const [listOrdos, setListOrdos] = useState([]);

    if (access === false) {

        //requête qui get les ordos selon le rôle
        Axios.post('http://localhost:8080/getListeOrdonnances', {
            role : role,
            id : 1111111111111,
        }).then(response => {
            setListOrdos(response.data);
            console.log(response.data);
            setAccess(true);
            return (
                <div>
                    <div className="login">
                        <span className="login-title">Liste des ordonnances</span>
                    </div>
                    <div className="page">
                        <table className="liste">
                            <tbody>
                            {listOrdos &&
                                listOrdos.map((el) => {
                                    return (<OrdoCard ordo={el} />)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        })
    }

    const OrdoCard = ({ordo}) => {
        return(
        <div className="OrdoCard">
            <h1>{ordo.IDOrdonnance}</h1>
        </div>
        )
    }
}

export default List;
