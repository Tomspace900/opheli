import React, {Component} from 'react';
import SoinCard from './SoinCard';

//pour Ordonnance Simple
export default class Categorie1 extends Component {

    render(){
        let Soins = [];

        const addSoin = (e) => {
            Soins.push(SoinCard);
        }

        const delSoin = (e) => {

        }
        return (
            <div>
                <label htmlFor="type">Type de la catégorie: </label>
                <input type="select" id="type" name="type">
                    <option value="remboursable"> Remboursable </option>
                    <option value="nonRemboursable"> Non remboursable </option>
                </input>
                <label htmlFor="nbRenouv">Nombre de renouvellements: </label>
                <input type="number" id="nbRenouv" name="nbRenouv"/>
                <br />
                {/*<button onClick={addSoin}> Ajouter soin</button>*/}
                <SoinCard/>
            </div>
        );
    }
};