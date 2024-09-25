import { useState, useEffect } from 'react';
import { getAuth , sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import validarLogin from '../utils/validadores/validadorLogin';
import ComponenteModal from '../components/ComponenteModal';
import { useTranslation } from 'react-i18next';

import '../css/landing.css'
import '../css/login.css'
import 'bootstrap/dist/css/bootstrap.css';

function RecuerarPass(){
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleShow = () => setShow(true);
    const {t, i18n} = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(navigator.language)
    }, [])

    
    const handleRedirect = () => {
        navigate('/home');
      };

    const handleShowAlert = () => {
        handleShow()
    };

    const handleClose = () => {
        setShow(false)
        handleRedirect()
    };

    const auth = getAuth();
    const recPass = (e) => {
        e.preventDefault();
        if(validarLogin(email)){
            sendPasswordResetEmail(auth, email)
            .then(() => {
                handleShowAlert()
            })
            .catch((error) => {
              console.log(error)
            });
        }
    }
    return(
        <div className="container">
        <div className="login-container gradient-bg-landing">
          <h2 className="text-center text-color">{t("login")}</h2>
          <form onSubmit={recPass}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label mt-2 text-color">{t("email")}</label>
              <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)} id="email" placeholder="Enter your email" />
              <div id="errEmail" style={{display: "none", color: "red"}}>
              {t("emailErr")}
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3 text-color">{t("recConstra")}</button>
          </form>
        </div>
        <ComponenteModal show={show} handleClose={handleClose} msg={t("correo_conf")} />
      </div>
    );
}

export default RecuerarPass