import React, { useState } from 'react'
import '../css/login.css'
import 'bootstrap/dist/css/bootstrap.css'
import { auth } from '../utils/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import exportFuncionesCuenta from '../utils/firebase'
import validaRegistro from '../utils/validadores/validadorRegistro'
import { useNavigate } from 'react-router-dom';

import '../css/landing.css'
import '../css/login.css'

function Registro () {
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [repPasswd, setRepPasswd] = useState('')
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/home');
  };

  const registroUsr = e => {
    e.preventDefault()
    if (validaRegistro(nombre, apellidos, email, passwd, repPasswd)) {
      createUserWithEmailAndPassword(auth, email, passwd)
        .then(userCredential => {
          const user = userCredential.user
          const uid = user.uid;
          exportFuncionesCuenta.addUsr(nombre, apellidos, email, passwd, uid)
          handleRedirect()
        })
        .catch(error => {
          const errorCode = error.code

          if(errorCode === "auth/email-already-in-use"){
            document.getElementById("errEmailExiste").style.display = "block";
          }else{
            document.getElementById("errEmailExiste").style.display = "none";
          }
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
          if(errorCode === "auth/invalid-password	"){
            document.getElementById("errFormatPass").style.display = "block";
          }else{
            document.getElementById("errFormatPass").style.display = "none";
          }
          if(errorCode === "auth/invalid-email"){
            document.getElementById("errEmail").style.display = "block";
          }else{
            document.getElementById("errEmail").style.display = "none";
          }
        })
    }
  }
  return (
    <div className='container'>
      <div className='login-container gradient-bg-landing'>
        <h2 className='text-center text-color'>Registro</h2>
        <form onSubmit={registroUsr}>
          <div className='mb-3 mt-2'>
            <label className='form-label text-color'>Nombre</label>
            <input
              className='form-control'
              id='nombre'
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder='Nombre'
            />
            <div
              id='errNombreFormato'
              style={{ display: 'none', color: 'red' }}
            >
              *Debes introducir un nombre con solo carácteres
            </div>
          </div>
          <div className='mb-3 mt-2'>
            <label className='form-label text-color'>Apellidos</label>
            <input
              className='form-control'
              id='apellidos'
              value={apellidos}
              onChange={e => setApellidos(e.target.value)}
              placeholder='Apellidos'
            />
            <div id='errApellidos' style={{ display: 'none', color: 'red' }}>
              *Debes introducir unos apellidos con solo carácteres
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='email' className='form-label mt-2 text-color'>
              Dirección de correo
            </label>
            <input
              type='email'
              className='form-control'
              value={email}
              onChange={e => setEmail(e.target.value)}
              id='email'
              placeholder='Email'
            />
            <div id='errEmail' style={{ display: 'none', color: 'red' }}>
              *Debes introducir un email válido "miguel@gmail.com"
            </div>
            <div id='errEmailExiste' style={{ display: 'none', color: 'red' }}>
              *El Email ya existe en la base de datos"
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label text-color'>
              Contraseña
            </label>
            <input
              type='password'
              className='form-control'
              value={passwd}
              id='password'
              onChange={e => setPasswd(e.target.value)}
              placeholder='Contraseña'
            />
            <div id='errFormatPass' style={{ display: 'none', color: 'red' }}>
              *La contraseña debe tener 1 mayúscula, 1 minuscula, 1 número, 1
              simbolo y entre 8 y 12 carácteres
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='form-label text-color'>
              Repetir contraseña
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              value={repPasswd}
              onChange={e => setRepPasswd(e.target.value)}
              placeholder='Repite la contraseña'
            />
          </div>
          <div id='errPassIgual' style={{ display: 'none', color: 'red' }}>
            *Las contraseñas tiene que ser iguales
          </div>
          <div id='errSesion' style={{ display: 'none', color: 'red' }}>
              <h1>La sesión ha expirado</h1>
          </div>
          <div id='errInterno' style={{ display: 'none', color: 'red' }}>
              *Tenemos problemas en el servido, intentalo más tarde
          </div>
          <div id='errInterno' style={{ display: 'none', color: 'red' }}>
              *Tenemos problemas en el servido, intentalo más tarde
          </div>
          <div id='errUsuarioServidor' style={{ display: 'none', color: 'red' }}>
              *Usuario desconocido
          </div>
          <div id='errPeticiones' style={{ display: 'none', color: 'red' }}>
              *Demasiadas peticiones, intentalo más tarde
          </div>
          <button type='submit' className='btn btn-primary w-100'>
            Registrarme
          </button>
        </form>
      </div>
    </div>
  )
}

export default Registro
