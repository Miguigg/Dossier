import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import validarLogin from '../utils/validadores/validadorLogin';

import '../css/landing.css'
import '../css/login.css'
import 'bootstrap/dist/css/bootstrap.css';

function Login() {

  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/home');
  };
  const signIn = (e) => {
    e.preventDefault();
    if(validarLogin(email)){
      signInWithEmailAndPassword(auth, email, passwd)
      .then((userCredential) => {
        document.getElementById("errCuenta").style.display = "none";
        const user = userCredential.user;
        handleRedirect()
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
      </div>
    </div>
  );
}

export default Login;

