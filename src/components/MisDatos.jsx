import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { sendEmailVerification } from 'firebase/auth'
import ComponenteModal from './ComponenteModal'

import '../css/comun.css'

function MisDatos (props) {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const [usuarioVerificado, setUsuarioVerificado] = useState('')
  const navigate = useNavigate()

  const t = props.t

  const handleRedirect = () => {
    navigate('/home')
  }

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
      setUsuarioVerificado(null)
    }
  })

  const sendVerificationEmail = e => {
    sendEmailVerification(auth.currentUser).then(() => {
      handleShowAlert()
    })
  }
  return (
    <div>
      <h2 className='text-dark'>
        {t('mis_datos')}
        <hr className='border border-primary border-3 opacity-75'></hr>
      </h2>
      <div className='mb-3 mt-2'>
        <label className='form-label text-color'>{t('nombre')}</label>
        <input
          className='form-control'
          value={props.datosUsr.nombre}
          id='nombre'
          placeholder='Nombre'
          disabled
        />
      </div>
      <div className='mb-3 mt-2'>
        <label className='form-label text-color'>{t('apellidos')}</label>
        <input
          className='form-control'
          value={props.datosUsr.apellidos}
          id='nombre'
          placeholder='Nombre'
          disabled
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label mt-2 text-color'>
          {t('email')}
        </label>
        <input
          type='email'
          className='form-control'
          value={props.datosUsr.correo}
          id='email'
          disabled
        />
      </div>
      <a
        href='/editar-cuenta'
        className='btn btn-success w-100 mt-3'
        role='button'
      >
        {t('edit_usr')}
      </a>
      <a
        href='/eliminar-cuenta'
        className='btn btn-danger w-100 mt-3'
        role='button'
      >
        {t('eliminar_et')}
      </a>
      <>
        {usuarioVerificado === null ? (
          <div className='p-5 '>
            <p className='text-err'>{t('verif_email')}</p>
            <button
              className='btn btn-primary'
              onClick={e => sendVerificationEmail()}
            >
              {t('envio_mail')}
            </button>
            <ComponenteModal
              show={show}
              handleClose={handleClose}
              msg='Debes confirmar el correo electronico en el mensaje que acabamos de enviar'
            />
          </div>
        ) : (
          <p className='p-5 text-exito'>{t('mail_verificado')}</p>
        )}
      </>
    </div>
  )
}

export default MisDatos
