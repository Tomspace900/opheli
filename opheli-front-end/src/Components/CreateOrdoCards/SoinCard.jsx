import React from 'react';

const SoinCard = ({ soin }) => {
    return (
        <div id={soin}>
            <label htmlFor={'nom' + soin}>Nom du soin: </label>
            <input type="text" id={'nom' + soin} name={'nom' + soin}></input>
            <label htmlFor={'desc' + soin}>Description du soin: </label>
            <input type="text" id={'desc' + soin} name={'desc' + soin}></input>
            <br />
        </div>
    );
};

export default SoinCard;
