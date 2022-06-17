import './../../CSS/Cards/LoginCard.css';
import LoginClient from './LoginClient';
import LoginMedecin from './LoginMedecin';
import LoginMutuelle from './LoginMutuelle';
import LoginPharma from './LoginPharma';

const LoginCard = () => {
    function ChangeForm(login) {
        switch (login) {
            case 0:
                console.log('login: 0');
                return <LoginClient />;
            case 1:
                console.log('login: 1');
                return <LoginMedecin />;
            case 2:
                console.log('login: 2');
                return <LoginPharma />;
            case 3:
                console.log('login: 3');
                return <LoginMutuelle />;
            default:
                console.log('default');
                return null;
        }
    }

    function mouseOver(e) {
        e.target.style.background = '#5ccdc4a9';
    }
    function mouseOut(e) {
        e.target.style.background = '';
    }

    return (
        <div className="login-card">
            <div className="login-card-menu">
                <div className="login-client" onMouseEnter={mouseOver} onMouseLeave={mouseOut} id={'test'}>
                    <span>Client</span>
                </div>
                <div className="login-medecin" onMouseEnter={mouseOver} onMouseLeave={mouseOut} onClick={ChangeForm(1)}>
                    <span>Médecin</span>
                </div>
                <div className="login-pharma" onMouseEnter={mouseOver} onMouseLeave={mouseOut} onClick={ChangeForm(2)}>
                    <span>Pharmacien</span>
                </div>
                <div className="login-mutuelle" onMouseEnter={mouseOver} onMouseLeave={mouseOut} onClick={ChangeForm(3)}>
                    <span>Mutuelle</span>
                </div>
            </div>
            <div className="login-form">
                <ChangeForm />
            </div>
        </div>
    );
};

export default LoginCard;
