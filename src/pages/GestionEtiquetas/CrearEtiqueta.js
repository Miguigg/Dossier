import React, { useState } from 'react'
import validacionEtiqueta from '../../utils/validadores/validacionEtiqueta'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { collection, addDoc, updateDoc , doc } from 'firebase/firestore'
import exportFuncionesCuenta from '../../utils/firebase'
import ComponenteModal from '../../components/ComponenteModal'

import '../../css/landing.css'
import '../../css/login.css'

function CrearEtiqueta () {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  
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
    if (validacionEtiqueta) {
      onAuthStateChanged(auth, async user => {
        if (user) {
          const uid = user.uid
          try {
            const docRef = await addDoc(
              collection(exportFuncionesCuenta.db, 'Etiquetas'),
              {
                nombre: nombre,
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
          <h1>Debes tener la sesión iniciada</h1>
        </div>
      ) : (
        <div className='container'>
          <div className='login-container gradient-bg-landing'>
            <h2 className='text-center text-color'>Crear nueva etiqueta</h2>
            <form onSubmit={crearEtiqueta}>
              <div className='mb-3'>
                <label className='form-label mt-2 text-color'>
                  Nombre Etiqueta
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  id='nombre'
                  placeholder='Nombre etiqueta'
                />
                <div
                  id='errNombreFormato'
                  style={{ display: 'none', color: 'red' }}
                >
                  *Debes introducir un nombre válido para la etiqueta
                </div>
              </div>
              <div className='mb-3'>
                <label className='form-label text-color'>Descripcion</label>
                <textarea
                  className='form-control'
                  value={descripcion}
                  placeholder='Escribe una descripción'
                  id='descripcion'
                  onChange={e => setDescripcion(e.target.value)}
                ></textarea>
                <div
                  id='errDescripcion'
                  style={{ display: 'none', color: 'red' }}
                >
                  *Introduce una descripcion adecuada
                </div>
                <div id='errBack' style={{ display: 'none', color: 'red' }}>
                  *Tenemos problemas con el servidor, intentalo más tarde
                </div>
              </div>
              <button type='submit' className='btn btn-success w-100 mt-3'>
                Crear etiqueta
              </button>
              <a href='/home' className='btn btn-danger w-100 mt-3' role='button'>
                Cancelar
              </a>
            </form>
          </div>
          <ComponenteModal show={show} handleClose={handleClose} msg="Tenemos problemas en el servidor" />
        </div>
      )}
    </>
  )
}

export default CrearEtiqueta
