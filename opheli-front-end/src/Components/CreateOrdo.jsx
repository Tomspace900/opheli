import React, {Component, useEffect, useState} from 'react';
import form from "./Form";
import $ from "jquery";

function App() {
    const [connected, setConnected] = useState(false);
    const [secu, setSecu] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [nbRenouv, setNbRenouv] = useState("");
    const [result, setResult] = useState("");

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleNbRenouvChange = (e) => {
        setNbRenouv(e.target.value);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleSecuChange = (e) => {
        setSecu(e.target.value);
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
                <input
                    type="text"
                    id="secu"
                    name="secu"
                    value={secu}
                    onChange={(event) => handleSecuChange(event)}
                />
                <br />
                <label htmlFor="date">Date de prescription: </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(event) => handleDateChange(event)}
                />
                <br />
                <label htmlFor="type">Type: </label>
                <input
                    type="select"
                    id="type"
                    name="type"
                    value={type}
                    onChange={(event) => handleTypeChange(event)}
                />
                <br />
                <br />
                <label htmlFor="nbRenouv">Nombre de renouvellements: </label>
                <input
                    type="number"
                    id="nbRenouv"
                    name="nbRenouv"
                    value={type}
                    onChange={(event) => handleNbRenouvChange(event)}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            <h1>{result}</h1>
        </div>
    );
}

export default App;