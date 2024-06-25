import React, { useState } from 'react';
import '../css/login.css'
import 'bootstrap/dist/css/bootstrap.css';
import { auth, app } from '../utils/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {

  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, passwd)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)   
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  return (
    <div className="container">
      <div className="login-container bg-white">
        <h2 className="text-center">Login</h2>
        <form onSubmit={signIn}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label mt-2">Dirección de correo</label>
            <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)} id="email" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" value={passwd} id="password"  onChange={(e)=> setPasswd(e.target.value)} placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

