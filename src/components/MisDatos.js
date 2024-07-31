import React, { useState } from 'react'
import { auth } from '../utils/firebase'
import { sendEmailVerification } from 'firebase/auth'
import ComponenteModal from '../components/ComponenteModal';
import { useNavigate } from 'react-router-dom';

import '../css/comun.css'

function MisDatos () {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const [usuarioVerificado, setUsuarioVerificado] = useState('')
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/home');
  };
  
  const handleShowAlert = () => {
    handleShow()
  }

  const handleClose = () => {
    setShow(false)
    handleRedirect()
  }

  auth.onAuthStateChanged(user => {
    if (auth.currentUser) {
      if (auth.currentUser.emailVerified) {
        setUsuarioVerificado(true)
      } else {
        setUsuarioVerificado(null)
      }
    } else {
      console.log('No user is signed in.')
    }
  })

  const sendVerificationEmail = e => {
    sendEmailVerification(auth.currentUser).then(() => {
      handleShowAlert()
    })
  }
  return (
    <div>
      <div className='mb-3 mt-2'>
        <label className='form-label text-color'>Nombre</label>
        <input
          className='form-control'
          id='nombre'
          placeholder='Nombre'
          disabled
        />
      </div>
      <div className='mb-3 mt-2'>
        <label className='form-label text-color'>Apellidos</label>
        <input
          className='form-control'
          id='nombre'
          placeholder='Nombre'
          disabled
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label mt-2 text-color'>
          Dirección de correo
        </label>
        <input
          type='email'
          className='form-control'
          id='email'
          placeholder='Enter your email'
          disabled
        />
      </div>
      <a href='/editar-cuenta' class='btn btn-success w-100 mt-3' role='button'>
        Editar usuario
      </a>
      <a
        href='/eliminar-cuenta'
        class='btn btn-danger w-100 mt-3'
        role='button'
      >
        Eliminar cuenta
      </a>
      <>
        {usuarioVerificado === null ? (
          <div className='p-5 '>
            <p className='text-err'>Email no verificado</p>
            <button
              className='btn btn-primary'
              onClick={e => sendVerificationEmail()}
            >
              Mandar email de verificación
            </button>
            <ComponenteModal show={show} handleClose={handleClose} msg="Debes confirmar el correo electronico en el mensaje que acabamos de enviar" />
          </div>
        ) : (
          <p className='p-5 text-exito'>Email verificado</p>
        )}
      </>
    </div>
  )
}

export default MisDatos
