import React from 'react';

const Form = () => {
    return (
        <div className="form">
            <form>
                <label for="prescription_date">Date de prescription : </label>
                <input type="text" id="prescription_date" name="prescription_date" />

                <label for="type">Type : </label>
                <select id="type" name="type">
                    <option value="Médicament 1"></option>
                    <option value="Médicament 2"></option>
                    <option value="Médicament 3"></option>
                    <option value="Médicament 4"></option>
                </select>

                <label>Patient : </label>
                <input
                    type="number"
                    id="security_nb"
                    name="security_nb"
                    min="13"
                    max="13"
                    placeholder="Numéro de sécurité sociale"
                />
                <input type="text" id="surname" name="surname" placeholder="Nom" />
                <input type="text" id="name" name="name" placeholder="Prénom" />

                <label for="item-1">Soin 1 : </label>
                <input type="text" id="item-1" name="item-1" placeholder="Nom" />
                <input type="text" id="desc-1" name="desc-1" placeholder="Description" />

                <button>Ajouter soin</button>

                <label for="renew">Renouvèlement</label>
                <input type="number" id="renew" name="renew" placeholder="Nombre" />

                <button>Générer</button>
            </form>
        </div>
    );
};

export default Form;
