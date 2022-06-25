import React, {Component, useEffect, useState} from 'react';
import form from "./Form";
import $ from "jquery";

function App() {
    /*
    const [connected, setConnected] = useState(false);
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    */
    const [result, setResult] = useState("");
/*
    useEffect(() => { //executé au lancement de la page
        setResult(sessionStorage.getItem("info")); //chercher la donnée en stockage
    })

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePassChange = (e) => {
        setPass(e.target.value);
    };
*/
    const handleSumbit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        console.log(form);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                setResult(data);
                //setConnected(data);
                console.log(data);
            },
        });
    };
    return (
        <div className="App">
            <h1>Form test</h1>
            <form
                action="http://opheli/opheli-back-end/PHP/login/backend_test.php"
                method="post"
                onSubmit={(event) => handleSumbit(event)}>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    //value={name}
                    //onChange={(event) => handleNameChange(event)}
                />
                <br />
                <label htmlFor="pass">Password: </label>
                <input
                    type="text"
                    id="pass"
                    name="pass"
                    //value={pass}
                    //onChange={(event) => handlePassChange(event)}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            <h1>{result}</h1>
        </div>
    );
}

export default App;