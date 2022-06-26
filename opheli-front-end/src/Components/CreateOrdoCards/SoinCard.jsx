import React from 'react';

const SoinCard = ({ soin }) => {
    return (
        <div id={soin}>
            <label>Nom du soin: </label>
            <input type="text"></input>
            <label>Description du soin: </label>
            <input type="text"></input>
            <br />
        </div>
    );
};

export default SoinCard;
