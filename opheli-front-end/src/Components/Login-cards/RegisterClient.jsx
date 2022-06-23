import React from 'react';

const RegisterClient = () => {
    function mouseOver(e) {
        e.target.style.color = '#5ccdc4a9';
        e.target.style.border = 'solid #5ccdc4 1px';
    }
    function mouseOut(e) {
        e.target.style.color = '#4a565a';
        e.target.style.border = 'solid #4a565a 1px';
    }
    return (
        <form className="register-form">
            <div className="register-form-doubleline">
                <div className="register-form-blockdoubleline">
                    <div className="register-label-firstname">
                        <label>Prénom :</label>
                    </div>
                    <div className="register-input-firstname">
                        <input type="text" placeholder="Mehdi" />
                    </div>
                </div>
                <div className="register-form-blockdoubleline">
                    <div className="register-label-surname">
                        <label>Nom :</label>
                    </div>
                    <div className="register-input-surname">
                        <input type="text" placeholder="Demille" />
                    </div>
                </div>
            </div>
            <div className="register-form-doubleline">
                <div className="register-form-blockdoubleline">
                    <div className="register-label-date">
                        <label>Date de naissance :</label>
                    </div>
                    <div className="register-input-date">
                        <input type="date" />
                    </div>
                </div>
                <div className="register-form-blockdoubleline">
                    <div className="register-label-mail">
                        <label>Adresse mail :</label>
                    </div>
                    <div className="register-input-id">
                        <input type="mail" placeholder="mehdi.demille@exemple.fr" />
                    </div>
                </div>
            </div>
            <div className="register-form-line">
                <div className="register-form-blockline">
                    <div className="register-label-id">
                        <label>Numero sécurité sociale :</label>
                    </div>
                    <div className="register-input-id">
                        <input type="text" placeholder="1234567890123" />
                    </div>
                </div>
            </div>
            <div className="register-form-doubleline">
                <div className="register-form-blockdoubleline">
                    <div className="login-label-pwd">
                        <label>Mot de passe :</label>
                    </div>
                    <div className="register-input-pwd">
                        <input type="password" />
                    </div>
                </div>
                <div className="register-form-blockdoubleline">
                    <div className="login-label-rpwd">
                        <label>Répéter mot de passe :</label>
                    </div>
                    <div className="register-input-rpwd">
                        <input type="password" />
                    </div>
                </div>
            </div>
            <div className="register-submit">
                <button type="button" className="register-box-submit" onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                    {/* Integrer l'insertion a la base de donnée */}
                    S'inscrire
                </button>
            </div>
        </form>
    );
};

export default RegisterClient;
