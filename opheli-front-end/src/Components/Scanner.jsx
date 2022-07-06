import React, { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const Scanner = () => {
    let html5QrCode;
    const qrConfig = { fps: 10 };

    function onResult(res) {
        alert(res);
    }

    useEffect(() => {
        html5QrCode = new Html5Qrcode('reader');
    }, []);

    const handleStart = () => {
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            onResult(decodedText);
            handleStop();
        };
        html5QrCode.start({ facingMode: 'environment' }, qrConfig, qrCodeSuccessCallback);
    };

    const handleStop = () => {
        try {
            html5QrCode
                .stop()
                .then((res) => {
                    html5QrCode.clear();
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div id="reader" width="100%" />
            <button onClick={() => handleStart()}>Start</button>
            <button onClick={() => handleStop()}>Stop</button>
        </div>
    );
};
export default Scanner;
