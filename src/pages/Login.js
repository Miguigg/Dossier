import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        document.getElementById("errCuenta").style.display = "block";
      });
    }
  }

  return (
    <div className="container">
      <div className="login-container gradient-bg-landing">
        <h2 className="text-center text-color">Login</h2>
        <form onSubmit={signIn}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label mt-2 text-color">Dirección de correo</label>
            <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)} id="email" placeholder="Enter your email" />
            <div id="errEmail" style={{display: "none", color: "red"}}>
            *Debes introducir un email válido "miguel@gmail.com"
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-color">Contraseña</label>
            <input type="password" className="form-control" value={passwd} id="password"  onChange={(e)=> setPasswd(e.target.value)} placeholder="Enter your password" />
            <div id="errCuenta" style={{display: "none", color: "red"}}>
            *La contraseña o el email no coinciden con el de ninguna cuenta
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3 text-color">Login</button>
        </form>
        <br></br>
        <p><a href="/recuperar-contrasenha">Recuperar contraseña</a></p>
      </div>
      <ComponenteModal show={show} handleClose={handleClose} msg="Debes confirmar el correo electronico en el mensaje que acabamos de enviar" />
    </div>
  );
}

export default Login;

