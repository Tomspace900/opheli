import React, {Component, useEffect, useReducer, useState} from 'react';
import form from "./Form";
import $ from "jquery";
import CategorieSimple from "./CreateOrdoCards/CategorieSimple";
import CategorieBizone from "./CreateOrdoCards/CategorieBizone";
import CategorieException from "./CreateOrdoCards/CategorieException";

function App() {

    //const [, forceRerender] = useReducer(x => x + 1, 0);

    const [simple, setSimple] = useState(true);
    const [bizone, setBizone] = useState(false);
    const [exception, setException] = useState(false);

    const handleTypeChange = (e) => {
        if(e.target.value === "simple"){
            setSimple(true);
            setBizone(false);
            setException(false);
        }
        if(e.target.value === "bizone"){
            setSimple(false);
            setBizone(true);
            setException(false);
        }
        if(e.target.value === "exception"){
            setSimple(false);
            setBizone(false);
            setException(true);
        }
        //forceRerender();
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
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
                <label htmlFor="secu">Numéro de sécurité sociale: </label>
                <input
                    type="text"
                    id="secu"
                    name="secu"
                />
                <br />
                <label htmlFor="date">Date de prescription: </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                />
                <br />
                <label htmlFor="type">Type de l'ordonannce: </label>
                <select id="type" name="type" onChange={(event) => handleTypeChange(event)}>
                    <option value="simple"> Simple </option>
                    <option value="bizone"> Bi-zone </option>
                    {/*<option value="exception"> Médicaments d'exception </option>*/}
                </select>
                {simple ? <CategorieSimple/> : null}
                {bizone ? <CategorieBizone/> : null}
                {exception ? <CategorieException/> : null}
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;