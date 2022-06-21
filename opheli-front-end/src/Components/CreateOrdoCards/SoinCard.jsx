import React, {Component} from 'react';

//Soin pour append dans Catégorie
export default class SoinCard extends Component {

    render(){
        return(
            <div>
                <label htmlFor="nomSoin">Nom du soin</label>
                <input type="text" id="nomSoin" name="nomSoin"></input>
                <label htmlFor="descSoin">Description du soin</label>
                <input type="text" id="descSoin" name="descSoin"></input>
                {/*<button onClick="delSoin">Supprimer</button>*/}
            </div>
        )
    }

}