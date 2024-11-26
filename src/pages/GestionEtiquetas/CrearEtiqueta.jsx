import { useState } from 'react'
import validacionEtiqueta from '../../utils/validadores/validacionEtiqueta'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { collection, addDoc, updateDoc , doc } from 'firebase/firestore'
import exportFuncionesCuenta from '../../utils/firebase'
import ComponenteModal from '../../components/ComponenteModal'
import { useTranslation } from 'react-i18next';

import '../../css/landing.css'
import '../../css/login.css'

function CrearEtiqueta () {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  
  const {t, i18n} = useTranslation();

  useEffect(() => {
      i18n.changeLanguage(navigator.language)
  }, [])
  

  const handleShowAlert = () => {
    handleShow()
  };

  const handleClose = () => {
    setShow(false)
    handleRedirect()
    };

  const handleRedirect = () => {
    navigate('/cuenta-usr')
  }

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

  const crearEtiqueta = e => {
    e.preventDefault()
    if (validacionEtiqueta(nombre, descripcion)) {
      onAuthStateChanged(auth, async user => {
        if (user) {
          const uid = user.uid
          try {
            const docRef = await addDoc(
              collection(exportFuncionesCuenta.db, 'Etiquetas'),
              {
                nombre: nombre,
                flag: "editable",
                descripcion: descripcion,
                idUsuario: uid
              }
            )
            const etRef = doc(exportFuncionesCuenta.db, "Etiquetas", docRef.id);
            await updateDoc(etRef, {
              idEtiqueta: docRef.id
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
          <h1>{t("errSesionIniciada")}</h1>
        </div>
      ) : (
        <div className='container'>
          <div className='login-container gradient-bg-landing'>
            <h2 className='text-center text-color'>{t("crear_et")}</h2>
            <form onSubmit={crearEtiqueta}>
              <div className='mb-3'>
                <label className='form-label mt-2 text-color'>
                  {t("nombre_et")}
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  id='nombre'
                  placeholder={t("nombre_et")}
                />
                <div
                  id='errNombreFormato'
                  style={{ display: 'none', color: 'red' }}
                >
                  {t("err_nombre_etiqueta")}
                </div>
              </div>
              <div className='mb-3'>
                <label className='form-label text-color'>{t("descripcion")}</label>
                <textarea
                  className='form-control'
                  value={descripcion}
                  placeholder={t("descripcion")}
                  id='descripcion'
                  onChange={e => setDescripcion(e.target.value)}
                ></textarea>
                <div
                  id='errDescripcion'
                  style={{ display: 'none', color: 'red' }}
                >
                  {t("err_descripcion")}
                </div>
                <div id='errBack' style={{ display: 'none', color: 'red' }}>
                  {t("errInterno")}
                </div>
              </div>
              <button type='submit' className='btn btn-success w-100 mt-3'>
                {t("crear_et")}
              </button>
              <a href='/cuenta-usr' className='btn btn-danger w-100 mt-3' role='button'>
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

export default CrearEtiqueta
