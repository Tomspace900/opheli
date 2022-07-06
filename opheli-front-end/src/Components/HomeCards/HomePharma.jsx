import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Scanner from '../Scanner';
import { Html5Qrcode } from 'html5-qrcode';

const HomePharma = ({ role }) => {
    const navigate = useNavigate();

    const [displayId, setDisplayId] = useState(false);
    const [displayQr, setDisplayQr] = useState(false);

    const [id, setId] = useState('');

    const [start, setStart] = useState(false);

    if (role.role == '') {
        navigate('/Error');
    }

    function mouseOver(e) {
        e.target.style.background = '#5ccdc4a9';
    }
    function mouseOut(e) {
        e.target.style.background = '';
    }

    function handleId(e) {
        setId(e.target.value);
    }

    function handleClick() {
        let url = '/ordonnance/' + id;
        console.log(url);
        navigate(url);
    }

    let html5QrCode;
    const qrConfig = { fps: 10 };

    function onResult(res) {
        let url = '/ordonnance/' + res;
        console.log(url);
        navigate(url);
    }

    const handleStart = () => {
        setStart(true);
        html5QrCode = new Html5Qrcode('reader');
        console.log('start');
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            onResult(decodedText);
            handleStop();
        };
        html5QrCode.start({ facingMode: 'environment' }, qrConfig, qrCodeSuccessCallback);
    };

    const handleStop = () => {
        setStart(false);
        try {
            html5QrCode
                .stop()
                .then((res) => {
                    html5QrCode.clear();
                })
                .catch((err) => {
                    console.log(err.message);
                });
            console.log('stop');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="home-cards">
            <div
                className="home-div-left"
                onMouseEnter={mouseOver}
                onMouseLeave={mouseOut}
                onClick={() => {
                    setDisplayQr(true);
                    setDisplayId(false);
                    handleStart();
                }}>
                <div id="reader" style={start ? null : { display: 'none' }} />
                {displayQr ? null : (
                    <div className="home-left-title-div">
                        <span className="home-left-title">Scanner un QR Code d'ordonnance</span>
                    </div>
                )}
                {displayQr ? null : (
                    <div className="home-left-svg-div">
                        <svg className="home-scan-ordo-svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 7v-1a2 2 0 0 1 2 -2h2" />
                            <path d="M4 17v1a2 2 0 0 0 2 2h2" />
                            <path d="M16 4h2a2 2 0 0 1 2 2v1" />
                            <path d="M16 20h2a2 2 0 0 0 2 -2v-1" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </div>
                )}
            </div>

            {displayId ? (
                <div className="home-div-right-active" onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                    <div className="home-right-title-div">
                        <span className="home-right-title">Entrer un numéro d'ordonnance</span>
                    </div>
                    <div className="home-right-content-div">
                        <form>
                            <input type="number" min={1} onChange={handleId} />
                            <br />
                            <button
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#5ccdc4a9';
                                    e.target.style.border = 'solid #5ccdc4 1px';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#4a565a';
                                    e.target.style.border = 'solid #4a565a 1px';
                                }}
                                onClick={() => handleClick()}>
                                Valider
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div
                    className="home-div-right"
                    onMouseEnter={mouseOver}
                    onMouseLeave={mouseOut}
                    onClick={() => {
                        setDisplayId(true);
                        setDisplayQr(false);
                        handleStop();
                    }}>
                    <div className="home-right-title-div">
                        <span className="home-right-title">Entrer un numéro d'ordonnance</span>
                    </div>
                    <div className="home-right-svg-div">
                        <svg className="home-id-ordo-svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3" />
                            <path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3" />
                            <path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7" />
                            <path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1" />
                            <path d="M17 12h.01" />
                            <path d="M13 12h.01" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePharma;
