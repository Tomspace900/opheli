import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

  const Qrtest = ({ text}) => {
    const [src,setSrc] = useState('');

    useEffect(() => {
      QRCode.toDataURL(text).then(setSrc);
      console.log("src : " + src);
    
    }, []); 
    return(
      <div>
        <h1>hello
        </h1>
        <img src={src} />
      </div>
    );
  };

  export default Qrtest;

   