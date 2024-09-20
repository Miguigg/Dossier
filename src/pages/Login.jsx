import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword , sendEmailVerification  } from "firebase/auth";
import validarLogin from '../utils/validadores/validadorLogin';
import ComponenteModal from '../components/ComponenteModal';

import '../css/landing.css'
import '../css/login.css'
import 'bootstrap/dist/css/bootstrap.css';

function Login() {
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleShow = () => setShow(true);
  
  const {t, i18n} = useTranslation();

  useEffect(() => {
      i18n.changeLanguage(navigator.language)
  }, [])

  const handleShowAlert = () => {
    handleShow()
  };

  const handleRedirect = () => {
    navigate('/home');
  };

  const handleClose = () => {
    setShow(false)
    handleRedirect()
    };

  const signIn = (e) => {
    e.preventDefault();
    if(validarLogin(email)){
      signInWithEmailAndPassword(auth, email, passwd)
      .then((userCredential) => {
        document.getElementById("errCuenta").style.display = "none";
        const user = userCredential.user;
        if(!user.emailVerified){
          sendEmailVerification(auth.currentUser)
            .then(() => {
              handleShowAlert()
            });
        }else{
          handleRedirect()
        }
      })
      .catch((error) => {
        const errorCode = error.code
        if(errorCode === "auth/id-token-expired"){
          document.getElementById("errSesion").style.display = "block";
        }else{
          document.getElementById("errSesion").style.display = "none";
        }
        if(errorCode === "auth/internal-error"){
          document.getElementById("errSesion").style.display = "block";
        }else{
          document.getElementById("errSesion").style.display = "none";
        }
        if(errorCode === "auth/user-not-found"){
          document.getElementById("errUsuarioServidor").style.display = "block";
        }else{
          document.getElementById("errUsuarioServidor").style.display = "none";
        }
        if(errorCode === "auth/too-many-requests"){
          document.getElementById("errPeticiones").style.display = "block";
        }else{
          document.getElementById("errPeticiones").style.display = "none";
        }
        if(errorCode === "auth/invalid-email"){
          document.getElementById("errEmail").style.display = "block";
        }else{
          document.getElementById("errEmail").style.display = "none";
        }
        if(errorCode === "auth/invalid-credential"){
          document.getElementById("errUsuarioServidor").style.display = "block";
        }else{
          document.getElementById("errUsuarioServidor").style.display = "none";
        }
      });
    }
  }

  return (
    <div className="container">
      <div className="login-container gradient-bg-landing">
        <h2 className="text-center text-color">Login</h2>
        <form onSubmit={signIn}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label mt-2 text-color">{t("email")}</label>
            <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)} id="email" placeholder="Enter your email" />
            <div id="errEmail" style={{display: "none", color: "red"}}>
            {t("emailErr")}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-color">{t("contraseña")}</label>
            <input type="password" className="form-control" value={passwd} id="password"  onChange={(e)=> setPasswd(e.target.value)} placeholder="Enter your password" />
            <div id="errCuenta" style={{display: "none", color: "red"}}>
            {t("contraseñaErr")}
            </div>
          </div>
          <div id='errSesion' style={{ display: 'none', color: 'red' }}>
              <h1>{t("sesionErr")}</h1>
          </div>
          <div id='errInterno' style={{ display: 'none', color: 'red' }}>
              {t("errInterno")}
          </div>
          <div id='errUsuarioServidor' style={{ display: 'none', color: 'red' }}>
              {t("usuarioDesc")}
          </div>
          <div id='errPeticiones' style={{ display: 'none', color: 'red' }}>
              {t("intentosErr")}
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3 text-color">Login</button>
        </form>
        <br></br>
        <p><a href="/recuperar-contrasenha">{t("recConstra")}</a></p>
      </div>
      <ComponenteModal show={show} handleClose={handleClose} msg={t("confirmarCorreo")} />
    </div>
  );
}

export default Login;

