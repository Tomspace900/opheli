import React from 'react';
import './../CSS/Home.css';

const Home = () => {
    function mouseOver(e) {
        e.target.style.background = '#5ccdc4a9';
    }
    function mouseOut(e) {
        e.target.style.background = '';
    }

    return (
        <div className="home">
            <div className="home-cards">
                <div className="home-div-left" onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                    <div className="home-left-title-div">
                        <span className="home-leftm-title">Ajouter une ordonnance</span>
                    </div>
                    <div className="home-left-svg-div">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-file-plus"
                            width="100"
                            height="100"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#000000"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                            <line x1="12" y1="11" x2="12" y2="17" />
                            <line x1="9" y1="14" x2="15" y2="14" />
                        </svg>
                    </div>
                </div>
                <div className="home-div-right" onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
                    <div className="home-right-title-div">
                        <span className="home-right-title">Modifier une ordonnance</span>
                    </div>
                    <div className="home-right-svg-div">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-file-diff"
                            width="100"
                            height="100"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#000000"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                            <line x1="12" y1="10" x2="12" y2="14" />
                            <line x1="10" y1="12" x2="14" y2="12" />
                            <line x1="10" y1="17" x2="14" y2="17" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
