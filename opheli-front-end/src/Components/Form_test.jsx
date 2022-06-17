import React, {Component, useEffect, useState} from 'react';
import form from "./Form";
import $ from "jquery";

function App() {
    const [name, setName] = useState("");
    const [result, setResult] = useState("");

    useEffect(() => { //execute au lancement de la page
        setResult(sessionStorage.getItem("info")); //chercher la donnée en stockage
    })

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                setResult(data);
                sessionStorage.setItem("info",data); //foutre la donnée en stockage du navigateur
            },
        });
    };
    return (
        <div className="App">
            <form
                action="http://opheli/opheli-back-end/PHP/login/backend_test.php"
                method="post"
                onSubmit={(event) => handleSumbit(event)}
            >
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(event) => handleChange(event)}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            <h1>{result}</h1>
        </div>
    );
}

export default App;