import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'
import ComponenteModal from '../../components/ComponenteModal'
import exportFuncionesCuenta from '../../utils/firebase'
import { useTranslation } from 'react-i18next';

import '../../css/landing.css'
import '../../css/login.css'
import validarAccesoDirecto from '../../utils/validadores/validarAccesoDirecto'

function AddAccesoDirecto () {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
  const [nombre, setNombre] = useState('')
  const [enlace, setEnlace] = useState('')
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  
  const handleShowAlert = () => {
    handleShow()
  };

  const handleClose = () => {
    setShow(false)
    handleRedirect()
    };

  const {t, i18n} = useTranslation();

  useEffect(() => {
        i18n.changeLanguage(navigator.language)
  }, [])
  

  useEffect(() => {
    const flagLogin = onAuthStateChanged(auth, user => {
      if (user) {
        setUsuarioAutenticado(user)
      } else {
        setUsuarioAutenticado(null)
      }
    })
    return () => {
      flagLogin()
    }
  }, [])

  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/cuenta-usr')
  }

  const AñadirAccesoDirecto = e => {
    e.preventDefault()
   
    if (validarAccesoDirecto(nombre, enlace)) {
      
      onAuthStateChanged(auth, async user => {
        if (user) {
          const uid = user.uid
          try {
            const docRef = await addDoc(
              collection(exportFuncionesCuenta.db, 'Accesos-directos'),
              {
                nombre: nombre,
                enlace: enlace,
                idUsuario: uid
              }
            )
            const etRef = doc(
              exportFuncionesCuenta.db,
              'Accesos-directos',
              docRef.id
            )
            await updateDoc(etRef, {
              idAcceso: docRef.id
            })
            handleClose()
            handleRedirect()
          } catch (e) {
            handleShowAlert()
          }
        } else {
          handleShowAlert()
        }
      })
    }
  }

  return (
    <>
      {usuarioAutenticado === null ? (
        <div className='p-5'>
          <h1>{t("sesionErr")}</h1>
        </div>
      ) : (
        <div className='container'>
          <div className='login-container gradient-bg-landing'>
            <h2 className='text-center text-color'>{t("anhadir_accesos")}</h2>
            <form onSubmit={AñadirAccesoDirecto}>
              <div className='mb-3'>
                <label className='form-label mt-2 text-color'>
                  {t("nombre_acceso_dir")}
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  id='nombre'
                  placeholder={t("nombre_acceso_dir")}
                />
                <div id='errNombre' style={{ display: 'none', color: 'red' }}>
                  {t("nombre_acceso_valido")}
                </div>
              </div>

              <div className='mb-3'>
                <label className='form-label mt-2 text-color'>{t("enlace")}</label>
                <input
                  type='text'
                  className='form-control'
                  value={enlace}
                  onChange={e => setEnlace(e.target.value)}
                  id='enlace'
                  placeholder={t("enlace")}
                />
                <div id='errEnlace' style={{ display: 'none', color: 'red' }}>
                  {t("err_link")}
                </div>
              </div>
              <div id='errBack' style={{ display: 'none', color: 'red' }}>
                {t("errInterno")}
              </div>
              <button type='submit' className='btn btn-success w-100 mt-3'>
                {t("anhadir_accesos")}
              </button>
              <a
                href='/cuenta-usr'
                className='btn btn-danger w-100 mt-3'
                role='button'
              >
                {t("cancelar")}
              </a>
            </form>
          </div>
          <ComponenteModal show={show} handleClose={handleClose} msg={t("errInterno")} />
        </div>
      )}
    </>
  )
}

export default AddAccesoDirecto
