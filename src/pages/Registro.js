import React, { useState } from 'react';
import '../css/login.css'
import 'bootstrap/dist/css/bootstrap.css';
import { auth, app } from '../utils/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import addUsr from '../utils/firebase';


function Registro() {

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');

  const registroUsr = (e) => {
    console.log('hola')
    e.preventDefault();
    createUserWithEmailAndPassword (auth, email, passwd)
    .then((userCredential) => {
      const user = userCredential.user;
      addUsr(nombre, apellidos, email, passwd)
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
        <h2 className="text-center">Registro</h2>
        <form onSubmit={registroUsr}>
        <div className="mb-3 mt-2">
            <label className="form-label">Nombre</label>
            <input className="form-control" id="nombre" value={nombre}  onChange={(e)=> setNombre(e.target.value)}  placeholder="Nombre" />
          </div>
          <div className="mb-3 mt-2">
            <label className="form-label">Apellidos</label>
            <input className="form-control" id="apellidos" value={apellidos} onChange={(e)=> setApellidos(e.target.value)} placeholder="Apellidos" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label mt-2">Dirección de correo</label>
            <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)} id="email" placeholder="Email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" value={passwd} id="password"  onChange={(e)=> setPasswd(e.target.value)} placeholder="Contraseña" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Repetir contraseña</label>
            <input type="password" className="form-control" id="password" placeholder="Repite la contraseña" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrarme</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;