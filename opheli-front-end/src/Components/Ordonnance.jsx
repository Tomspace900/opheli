import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import '../CSS/Ordonnance.css';
import '../CSS/Form.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Ordonnance = ({
    role,
    // idOrdo
}) => {
    // Remplacer la const login par role et la const idOrdo par idOrdo A LA FIN UNIQUEMENT !!!!!
    const [login, setLogin] = useState('client');
    const [idOrdo, setIdOrdo] = useState(2);
    const [nomMedecin, setNomMedecin] = useState('');
    const [nomPatient, setNomPatient] = useState('');
    const navigate = useNavigate();

    const [src, setSrc] = useState('');
    const [link, setLink] = useState('http://localhost:3000/ordonnance');

    const [element, setElement] = useState([]);

    // if (role == '') {
    //     navigate('/Error');
    // }

    useEffect(() => {
        QRCode.toDataURL(link).then(setSrc);
        getData();
    }, []);

    const getData = async () => {
        let response = await axios.post('http://localhost:8080/getOrdonnance', {
            idOrdo: idOrdo,
            role: login,
        });
        console.log(response.data);
        setElement(response.data);
        console.log(response.data[0].IdPrescripteur);
        axios
            .post('http://localhost:8080/getNomMedecin', {
                id: response.data[0].IdPrescripteur,
            })
            .then((res1) => {
                console.log('medecin: ' + res1.data);
                setNomMedecin(res1.data[0].NomUtilisateur);
            });
        axios
            .post('http://localhost:8080/getNomPatient', {
                id: response.data[0].IdPatient,
            })
            .then((res2) => {
                console.log('patient: ' + res2.data);
                setNomPatient(res2.data[0].NomUtilisateur);
            });
    };

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
                    <span>{nomMedecin}</span>
                    <br />
                    <span>{element[0].NomSpecialite}</span>
                </div>
                <div className="ordo-cabinet">
                    <span>{element[0].Rue}</span>
                    <br />
                    <span>{element[0].CodePostal + ', ' + element[0].Ville}</span>
                </div>
            </div>
        );
    };

    const OrdoDate = () => {
        const [displayProlonger, setDisplayProlonger] = useState(false);

        const [nbMois, setNbMois] = useState(0);

        const monthList = [
            'janvier',
            'février',
            'mars',
            'avril',
            'mai',
            'juin',
            'juillet',
            'août',
            'septembre',
            'octobre',
            'novembre',
            'décembre',
        ];

        function day(date) {
            return date.getDate() - 1;
        }
        function month(date) {
            return monthList[date.getMonth()];
        }
        function addMonth(date, month) {
            return monthList[(parseInt(date.getMonth()) + parseInt(month)) % 12];
        }
        function year(date) {
            return date.getFullYear();
        }

        var dp = new Date(element[0].DateCreation);
        var de = new Date(element[0].DateExpiration);

        var datePre = day(dp) + ' ' + month(dp) + ' ' + year(dp);
        var dateExp = day(de) + ' ' + addMonth(de, nbMois) + ' ' + year(de);

        const handleNbMois = (e) => {
            setNbMois(e.target.value);
            console.log(nbMois);
        };

        const submitProlonger = () => {
            if (nbMois > 0) {
                axios.post('http://localhost:8080/prolongerOrdonnance', {
                    idOrdo: idOrdo,
                    nbMois: nbMois,
                });
                setDisplayProlonger(false);
            }
        };

        if (login === 'medecin') {
            return (
                <div className="ordo-date" id="ordo-medecin-date">
                    <div id="medecin-prolonger">
                        <div>
                            {displayProlonger ? (
                                <>
                                    <input type="number" placeholder="0" min={1} max={6} onChange={handleNbMois} />
                                    <span> mois</span>
                                    <br />
                                    <button onMouseEnter={mouseOver} onMouseLeave={mouseOut} onClick={submitProlonger}>
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
                        <span>{datePre}</span>
                        <br />
                        <span>Valable jusqu'au </span>
                        <span>{dateExp}</span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="ordo-date">
                    <span>Délivrée le </span>
                    <span>{datePre}</span>
                    <br />
                    <span>Valable jusqu'au </span>
                    <span>{dateExp}</span>
                </div>
            );
        }
    };

    const OrdoPatient = () => {
        // Medecin Patient Mutuelle
        if (login === 'client' || login === 'medecin' || login === 'mutuelle') {
            return (
                <div className="ordo-patient">
                    <span>Madame / Monsieur</span>
                    <br />
                    <span>{nomPatient}</span>
                </div>
            );
        } else return null;
    };

    const OrdoSoins = ({ delivres, setDelivres, checkOrdo }) => {
        // TODO :
        // Medecin et client voientt tout les soins initiaux
        // Pharma voit les soins restants a delivrer (= nb restant > 0)
        // Mutuelle voit les soins delivres (= nb restant < nb initial)
        switch (login) {
            case 'medecin':
                return (
                    <div className="ordo-soins">
                        <>
                            {element &&
                                element.map((el) => {
                                    // setDelivres([...delivres, { id: '', price: '' }]);
                                    // setGeneriques([...generiques, { id: '', generique: '', price: '' }]);
                                    return <OrdoSoinsCard soin={el} key={el.IdSoin} />;
                                })}
                        </>
                    </div>
                );
            case 'mutuelle':
                return (
                    <div className="ordo-soins">
                        <>
                            {element &&
                                element.map((el) => {
                                    return <OrdoSoinsCard soin={el} key={el.IdSoin} />;
                                })}
                        </>
                    </div>
                );
            case 'client':
                return (
                    <div className="ordo-soins">
                        <>
                            {element &&
                                element.map((el) => {
                                    return <OrdoSoinsCard soin={el} key={el.IdSoin} />;
                                })}
                        </>
                    </div>
                );
            case 'pharma':
                return (
                    <div className="ordo-soins">
                        <>
                            {element &&
                                element.map((el) => {
                                    return <OrdoSoinsCard soin={el} key={el.IdSoin} checkOrdo={checkOrdo} />;
                                })}
                        </>
                    </div>
                );
            default:
                return null;
        }
    };

    const OrdoSoinsCard = ({ soin, checkOrdo }) => {
        // Medecin voit juste nom et description
        // Pharmacien Mutuelle Client voient le prix
        // Pharmacien modifie le prix, le nb d'utilisations restantes et l'alternative

        const [displayGenerique, setDisplayGenerique] = useState(false);
        const [generique, setGenerique] = useState('');
        const [deliver, setDeliver] = useState(false);
        const [price, setPrice] = useState(0);

        const handleGenerique = (e) => {
            setGenerique(e.target.value);
        };

        const handleDeliver = () => {
            setDeliver((current) => !current);
        };

        const handlePrice = (e) => {
            setPrice(e.target.value);
        };

        useEffect(() => {
            if (checkOrdo && deliver) {
                if (price > 0) {
                    if (generique !== '') {
                        delivres.id = soin.IdSoin;
                        delivres.generique = generique;
                        delivres.price = price;
                    } else {
                        delivres.id = soin.IdSoin;
                        delivres.price = price;
                    }
                } else alert('Veuillez renseigner tous les prix des soins délivrés');
            }
        }, []);

        const [changeName, setChangeName] = useState('');

        function submitGenerique() {
            if (generique !== '') {
                setChangeName(generique);
                setDisplayGenerique(false);
            }
        }

        // function displaySoinName() {
        //     console.log('hehooooo');
        //     if (soin.Alternative !== null && soin.Alternative !== undefined) {
        //         console.log('alternative not null');
        //         return <span id="client-soin-title">{soin.Alternative}</span>;
        //     } else {
        //         console.log('alternative null');
        //         return <span id="client-soin-title">{soin.NomSoin}</span>;
        //     }
        // }

        switch (login) {
            case 'medecin':
                return (
                    <div className="soin-card">
                        <div id="medecin-soin-name">
                            <span id="medecin-soin-title">{soin.NomSoin}</span>
                            <br />
                            <span id="medecin-soin-desc">{soin.Description}</span>
                        </div>
                    </div>
                );
            case 'mutuelle':
                return (
                    <div className="soin-card">
                        <div id="mutuelle-soin-name">
                            <span id="mutuelle-soin-title">{soin.NomSoin}</span> <br />
                        </div>
                        <div id="mutuelle-soin-price">
                            <span>{soin.Prix}</span>
                        </div>
                    </div>
                );
            case 'client':
                return (
                    <div className="soin-card">
                        <div id="client-soin-name">
                            <span id="client-soin-title">{soin.Alternative !== null ? soin.Alternative : soin.NomSoin}</span>
                            <br />
                            <span id="client-soin-desc">{soin.Description}</span>
                        </div>
                        <div id="client-soin-use">
                            <span>Valable </span>
                            <br />
                            <span>{soin.NbRestants}</span>
                            <br />
                            <span> fois</span>
                        </div>
                    </div>
                );
            case 'pharma':
                return (
                    <div className="soin-card">
                        <div id="pharma-soin-name">
                            <span id="client-soin-title">
                                {(() => {
                                    if (changeName !== '') {
                                        return changeName;
                                    } else {
                                        return soin.Alternative !== null ? soin.Alternative : soin.NomSoin;
                                    }
                                })()}
                            </span>
                        </div>
                        <div id="pharma-soin-generique">
                            {displayGenerique ? (
                                <>
                                    <input type="text" placeholder="Nom du générique" onChange={handleGenerique}></input>
                                    <br />
                                    <button onMouseEnter={mouseOver} onMouseLeave={mouseOut} onClick={submitGenerique}>
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
                            <input type="checkbox" id="pharma-soin-input-use" onChange={handleDeliver} />
                            <span>Délivré</span>
                        </div>
                        <div id="pharma-soin-price">
                            <input type="number" id="pharma-soin-input-price" onChange={handlePrice} />
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
            if (element[0].Notes !== null) {
                return (
                    <div className="ordo-notes">
                        <span>{element[0].Notes}</span>
                    </div>
                );
            }
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
        const name = 'Ordonnance N°' + element[0].IdOrdonnance;
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

    const [delivres, setDelivres] = useState([]);

    const [checkOrdo, setCheckOrdo] = useState(false);

    function submitOrdo(e) {
        e.preventDefault();
        setCheckOrdo(true);
        switch (login) {
            case 'pharma':
                // TODO Axios une liste des ID des soins délivrés ET une liste des soins avec génériques

                axios.post('http://localhost:8080/deliverOrdonnance', {
                    soinsDelivres: delivres,
                });
                break;
            default:
                return null;
        }
    }

    if (element.length === 0) return <div>Loading</div>;

    return (
        <div className="ordo">
            <h1 className="ordo-title">{'Ordonnance N°' + element[0].IdOrdonnance}</h1>
            <OrdoMedecin />
            <OrdoDate />
            <OrdoPatient />
            <OrdoSoins delivres={delivres} setDelivres={setDelivres} checkOrdo={checkOrdo} />
            <OrdoNotes />
            <OrdoQR />
            <ValiderOrdo />
        </div>
    );
};

export default Ordonnance;
