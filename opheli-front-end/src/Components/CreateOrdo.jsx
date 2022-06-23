import React, { Component, useEffect, useState } from 'react';
import form from './Form';
import $ from 'jquery';
import Categorie1 from './CreateOrdoCards/Categorie1';

function App() {
    const [connected, setConnected] = useState(false);
    let [categorieDiv, setCategorieDiv] = useState(<div></div>);
    const [type, setType] = useState(0);

    const handleTypeChange = (e) => {
        if (type === 1) {
            categorieDiv = Categorie1;
        }
        setType(e.target.value);
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
            <h1>Form test</h1>
            <form
                action="http://opheli/opheli-back-end/PHP/login/create_ordo.php"
                method="post"
                onSubmit={(event) => handleSumbit(event)}>
                <label htmlFor="secu">Numéro de sécurité sociale: </label>
                <input type="text" id="secu" name="secu" />
                <br />
                <label htmlFor="date">Date de prescription: </label>
                <input type="date" id="date" name="date" />
                <br />
                <label htmlFor="type">Type: </label>
                <input type="select" id="type" name="type" value={type} onChange={(event) => handleTypeChange(event)} />
                {categorieDiv}
                <Categorie1 />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
