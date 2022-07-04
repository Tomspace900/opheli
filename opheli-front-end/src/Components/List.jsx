import React, { useState } from 'react';
import '../CSS/List.css';
import '../CSS/Login.css';
import Axios from "axios";
import {useNavigate} from "react-router-dom";


function List({role}) {
    const [access, setAccess] = useState(false);
    const navigate = useNavigate();

    //if (role  == '') {navigate('/Error')}

    //TODO ça c'était pour mes tests c'est pas final je pense -Clovis
    const [listOrdos, setListOrdos] = useState([]);

    if (access == false) {
        //requête qui get les ordos selon le rôle
        Axios.get('http://localhost:8080/getListeOrdonnances').then(response => {
            setListOrdos(response.data);
            setAccess(true);
            console.log(response.data);
        })
    }

    function handleClick(idordo) {
        navigate('/Ordonnance',{idordo})
    }

    return (
        <div>
            <div className="login">
                <span className="login-title">Liste des ordonnances</span>
            </div>
            <div className="page">
                <table className="liste">
                    <tbody>
                    {listOrdos.map(item => {
                        return (
                            <tr className='tr' onClick={() => handleClick(item.IDOrdonnance)}>
                                <td className='td'>{item.IDOrdonnance}</td>
                                <td className='td'>{item.DateCreation}</td>
                                <td className='td'>{item.NomUtilisateur}</td>
                                <td className='td'>{item.PrenomUtilisateur}</td>
                                <td className='td'>{item.TypeOrdonnance}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List;
