import React, { Component, useEffect, useReducer, useState } from 'react';
import form from './Form';
import $ from 'jquery';
import CategorieSimple from './CreateOrdoCards/CategorieSimple';
import CategorieBizone from './CreateOrdoCards/CategorieBizone';
import CategorieException from './CreateOrdoCards/CategorieException';

function App() {
    //const [, forceRerender] = useReducer(x => x + 1, 0);

    const [categorie, setCategorie] = useState('simple');

    const handleChangeCategorie = (e) => {
        setCategorie(e.target.value);
        console.log(e.target.value);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form.serialize(),
            success(data) {
                //setResult(data);
            },
        });
    };
    return (
        <div className="App">
            <h1>Créer une ordonnance</h1>
            <form
                action="http://opheli/opheli-back-end/PHP/login/create_ordo.php"
                method="post"
                onSubmit={(event) => handleSumbit(event)}>
                <label htmlFor="secu">Numéro de sécurité sociale du patient: </label>
                <input type="text" id="secu" name="secu" />
                <br />
                {/* Je pense que la date de prescription est par defaut la date du jour, c'est pas au medecin de la remplir
                 <label htmlFor="date">Date de prescription: </label>
                <input type="date" id="date" name="date" />
                <br /> */}
                <label htmlFor="type">Type de l'ordonannce: </label>
                <select id="type" name="type" onChange={(event) => handleChangeCategorie(event)}>
                    <option value="simple"> Simple </option>
                    <option value="bizone"> Bi-zone </option>
                    <option value="exception"> Médicaments d'exception </option>
                </select>
                {(() => {
                    switch (categorie) {
                        case 'bizone':
                            return <CategorieBizone />;
                        case 'exception':
                            return <CategorieException />;
                        default:
                            return <CategorieSimple />;
                    }
                })()}
                <br />
                <label htmlFor="notes">Notes: </label>
                <input type="text" id="notes" name="notes" />
                <br />
                <button type="submit">Valider</button>
            </form>
        </div>
    );
}

export default App;
