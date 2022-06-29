import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import '../CSS/Ordonnance.css';
import axios from 'axios';
import { data } from 'jquery';

const Ordonnance = () => {
    const [login, setLogin] = useState('client');
    const [src, setSrc] = useState('');
    const [idOrdo, setIdOrdo] = useState(1);

    const [link, setLink] = useState('http://localhost:3000/ordonnance');

    const [element, setElement] = useState('');

    useEffect(() => {
        QRCode.toDataURL(link).then(setSrc);
    }, []);

    useEffect(() => {
        axios
            .post('http://localhost:8080/getOrdonnance', {
                idOrdo: idOrdo,
                role: login,
            })
            .then((response) => {
                console.log(response.data);
            });
    }, []);

    function mouseOver(e) {
        e.target.style.color = '#5ccdc4a9';
        e.target.style.border = 'solid #5ccdc4a9 1px';
    }
    function mouseOut(e) {
        e.target.style.color = '#4a565a';
        e.target.style.border = 'solid #4a565a 1px';
    }

    const OrdoMedecin = () => {
        return (
            <div className="ordo-medecin">
                <div className="ordo-docteur">
                    <span>Docteur</span>
                    <br />
                    <span>ATCHOUM</span>
                    <br />
                    <span>Généraliste</span>
                </div>
                <div className="ordo-cabinet">
                    <span>1, rue de la République</span>
                    <br />
                    <span>75000, PARIS</span>
                </div>
            </div>
        );
    };

    const OrdoDate = () => {
        const [displayProlonger, setDisplayProlonger] = useState(false);

        if (login === 'medecin') {
            return (
                <div className="ordo-date" id="ordo-medecin-date">
                    <div id="medecin-prolonger">
                        <div>
                            {displayProlonger ? (
                                <>
                                    <input type="number" placeholder="0" />
                                    <span> mois</span>
                                    <br />
                                    <button onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                                        Valider
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            setDisplayProlonger(false);
                                        }}
                                        onMouseEnter={mouseOver}
                                        onMouseLeave={mouseOut}>
                                        Annuler
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        setDisplayProlonger(true);
                                    }}
                                    onMouseEnter={mouseOver}
                                    onMouseLeave={mouseOut}>
                                    Renouveler
                                </button>
                            )}
                        </div>
                    </div>
                    <div id="medecin-date">
                        <span>Délivrée le </span>
                        <span>12 septembre 2021</span>
                        <br />
                        <span>Valable jusqu'au </span>
                        <span>12 decembre 2021</span>
                        {displayProlonger ? (
                            <>
                                <br />
                                <br />
                                <span>Nouvelle valabilité : </span>
                                <span>12 decembre 2021</span>
                            </>
                        ) : null}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="ordo-date">
                    <span>Délivrée le </span>
                    <span>12 septembre 2021</span>
                    <br />
                    <span>Valable jusqu'au </span>
                    <span>12 decembre 2021</span>
                </div>
            );
        }
    };
    // Pour prolonger la date d'expiration :
    // const [prolonger, setProlonger] = useState('');

    // function prolongerDate() {}

    const OrdoPatient = () => {
        // Medecin Patient Mutuelle
        if (login === 'client' || login === 'medecin' || login === 'mutuelle') {
            return (
                <div className="ordo-patient">
                    <span>Madame / Monsieur</span>
                    <br />
                    <span>DEMILE</span>
                </div>
            );
        } else return null;
    };

    const OrdoSoins = () => {
        // Medecin voit tout les soins initiaux
        // Client voit les soins initiaux et le nombre restant (meme si zéro)
        // Pharma voit les soins restants a delivrer
        // Mutuelle voit les soins delivres
        switch (login) {
            case 'medecin':
                return (
                    <div className="ordo-soins">
                        <>
                            {element.map(() => {
                                <OrdoSoinsCard data={element} />;
                            })}
                            {/* Faire un map des soins ADL et simples de l'ordonnance */}
                            <OrdoSoinsCard n="1" />
                        </>
                        <>
                            <OrdoSoinsCard n="2" />
                            <OrdoSoinsCard n="3" />
                            <OrdoSoinsCard n="4" />
                        </>
                    </div>
                );
            case 'mutuelle':
                return (
                    <div className="ordo-soins">
                        <>
                            {/* Faire un map des soins ADL et simples de l'ordonnance */}
                            <OrdoSoinsCard n="1" />
                        </>
                        <>
                            <OrdoSoinsCard n="2" />
                            <OrdoSoinsCard n="3" />
                            <OrdoSoinsCard n="4" />
                        </>
                    </div>
                );
            case 'client':
                return (
                    <div className="ordo-soins">
                        <>
                            {/* Faire un map des soins ADL et simples de l'ordonnance */}
                            <OrdoSoinsCard n="1" />
                        </>
                        <>
                            <OrdoSoinsCard n="2" />
                            <OrdoSoinsCard n="3" />
                            <OrdoSoinsCard n="4" />
                        </>
                    </div>
                );
            case 'pharma':
                return (
                    <div className="ordo-soins">
                        <>
                            {/* Faire un map des soins ADL et simples de l'ordonnance */}
                            <OrdoSoinsCard n="1" />
                        </>
                        <>
                            <OrdoSoinsCard n="2" />
                            <OrdoSoinsCard n="3" />
                            <OrdoSoinsCard n="4" />
                        </>
                    </div>
                );
            default:
                return null;
        }
    };

    const OrdoSoinsCard = ({ data }) => {
        // Medecin voit juste nom et description
        // Pharmacien Mutuelle Client voient le prix
        // Pharmacien modifie le prix, le nb d'utilisations restantes et l'alternative

        const [displayGenerique, setDisplayGenerique] = useState(false);

        // verifier que tout les champs sont remplis si modif
        // Si generique : nom + delivré
        // Si delivré : prix
        // doit renvoyer une variable true
        function submitGenerique() {}

        switch (login) {
            case 'medecin':
                return (
                    <div className="soin-card">
                        <div id="medecin-soin-name">
                            <span id="medecin-soin-title">Nom du soin :{data.nom}</span> <br />
                            <span id="medecin-soin-desc">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime ea nulla officia similique esse
                                vitae?
                            </span>
                        </div>
                    </div>
                );
            case 'mutuelle':
                return (
                    <div className="soin-card">
                        <div id="mutuelle-soin-name">
                            <span id="mutuelle-soin-title">Nom du soin {data.nom}</span> <br />
                        </div>
                        <div id="mutuelle-soin-price">
                            <span>2,39 €</span>
                        </div>
                    </div>
                );
            case 'client':
                return (
                    <div className="soin-card">
                        <div id="client-soin-name">
                            <span id="client-soin-title">Nom du soin {data.nom}</span> <br />
                            <span id="client-soin-desc">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime ea nulla officia similique esse
                                vitae?
                            </span>
                        </div>
                        <div id="client-soin-use">
                            <span>Valable </span>
                            <br />
                            <span>X</span>
                            <br />
                            <span> fois</span>
                        </div>
                    </div>
                );
            case 'pharma':
                return (
                    <div className="soin-card">
                        <div id="pharma-soin-name">
                            <span>Nom du soin {data.nom}</span>
                        </div>
                        <div id="pharma-soin-generique">
                            {displayGenerique ? (
                                <>
                                    <input type="text" placeholder="Nom du générique"></input>
                                    <br />
                                    <button onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                                        Valider
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            setDisplayGenerique(false);
                                        }}
                                        onMouseEnter={mouseOver}
                                        onMouseLeave={mouseOut}>
                                        Annuler
                                    </button>
                                </>
                            ) : (
                                <button
                                    id="pharma-soin-alternative"
                                    onClick={(e) => {
                                        setDisplayGenerique(true);
                                    }}
                                    onMouseEnter={mouseOver}
                                    onMouseLeave={mouseOut}>
                                    Générique
                                </button>
                            )}
                        </div>
                        <div id="pharma-soin-use">
                            <input type="checkbox" id="pharma-soin-input-use" />
                            <span>Délivré</span>
                        </div>
                        <div id="pharma-soin-price">
                            <input type="number" id="pharma-soin-input-price" />
                            <span> €</span>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const OrdoNotes = () => {
        // Medecin Patient
        if (login === 'client' || login === 'medecin') {
            return (
                <div className="ordo-notes">
                    <span>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque nihil vel iste maiores. Molestiae quas
                        vero totam doloribus minus iusto facilis dolore exercitationem, perferendis eaque aut quibusdam, quia
                        necessitatibus cupiditate.
                    </span>
                </div>
            );
        } else return null;
    };

    const OrdoQR = () => {
        // Client
        if (login === 'client') {
            return (
                <div className="ordo-qrcode">
                    {qrCode ? (
                        <>
                            <img src={src} alt="qrcode" />
                            <br />
                            <button onClick={displayQR} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                                Masquer le QR code
                            </button>
                        </>
                    ) : (
                        <button onClick={displayQR} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                            Afficher le QR code
                        </button>
                    )}

                    <button onClick={downloadQR} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                        Télécharger le QR code
                    </button>
                </div>
            );
        } else return null;
    };

    function downloadQR() {
        const a = document.createElement('a');
        const name = 'Ordonnance ' + 'id_ordonnance';
        a.href = src;
        a.download = name;
        a.click();
    }

    const [qrCode, setQrCode] = useState(false);

    function displayQR() {
        setQrCode((n) => !n);
    }

    const ValiderOrdo = () => {
        switch (login) {
            case 'medecin':
                return (
                    <button className="ordo-submit" onClick={submitOrdo} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                        Valider
                    </button>
                );
            case 'pharma':
                return (
                    <button className="ordo-submit" onClick={submitOrdo} onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                        Valider
                    </button>
                );
            default:
                return null;
        }
    };

    function submitOrdo() {
        switch (login) {
            case 'medecin':
                break;
            case 'pharma':
                break;
            default:
                return null;
        }
    }

    return (
        <div className="ordo">
            <h1 className="ordo-title">Ordonnance N 123456</h1>
            <OrdoMedecin />
            <OrdoDate />
            <OrdoPatient />
            <OrdoSoins />
            <OrdoNotes />
            <OrdoQR />
            <ValiderOrdo />
        </div>
    );
};

export default Ordonnance;
