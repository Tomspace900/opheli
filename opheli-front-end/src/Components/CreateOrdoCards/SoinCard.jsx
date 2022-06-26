import React from 'react';

const SoinCard = ({ soin }) => {
    return (
        <div id={soin} className="create-ordo-soin-card">
            <div className="create-ordo-soin-card-name">
                <input type="text" placeholder="Nom du soin" />
            </div>
            <div className="create-ordo-soin-card-desc">
                <textarea type="text" placeholder="Description" />
            </div>
        </div>
    );
};

export default SoinCard;
