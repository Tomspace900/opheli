import React, { useState } from 'react';

const SoinCard = ({ soin }) => {
    const handleName = (e) => {
        soin.name = e.target.value;
        console.log(soin);
    };

    const handleDesc = (e) => {
        soin.desc = e.target.value;
        console.log(soin);
    };

    return (
        <div className="create-ordo-soin-card">
            <div className="create-ordo-soin-card-name">
                <input
                    type="text"
                    placeholder="Nom du soin"
                    onChange={(e) => {
                        handleName(e);
                    }}
                />
            </div>
            <div className="create-ordo-soin-card-desc">
                <textarea
                    type="text"
                    placeholder="Description"
                    onChange={(e) => {
                        handleDesc(e);
                    }}
                />
            </div>
        </div>
    );
};

export default SoinCard;
