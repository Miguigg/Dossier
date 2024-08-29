import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { collection, query, where, getDocs , doc, deleteDoc } from 'firebase/firestore'
import exportFuncionesCuenta from '../../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import ComponenteModal from '../../components/ComponenteModal'


import '../../css/landing.css'
import '../../css/login.css'

function EliminarArticulo () {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [enlace, setEnlace] = useState('');
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState('')

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/cuenta-usr');
  };

  const location = useLocation();
  const data = location.state;
  
  const handleShowAlert = () => {
    handleShow()
  };

  const handleClose = () => {
    setShow(false)
  };

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

  const EliminarArticulo = async e => {
    e.preventDefault()
    await deleteDoc(doc(exportFuncionesCuenta.db, "Articulos", data.idArticulo));
    handleRedirect()
  }

  //recuperar datos del objeto a eliminar
  useEffect(() => {
    setNombre(data.nombre)
    setDescripcion(data.descripcion)
    setEnlace(data.enlace)
    getNombreEtiqueta()
  }, [])

  function getNombreEtiqueta () {
    onAuthStateChanged(auth, async user => {
      if (user) {
        let tmpLista = ''
        const uid = user.uid
        const q = query(
          collection(exportFuncionesCuenta.db, 'Etiquetas'),
          where('idUsuario', '==', uid),
          where('idEtiqueta', '==', data.idEtiqueta)
        )

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => {
          tmpLista = doc.data()
        })
        setEtiquetaSeleccionada(tmpLista.nombre)
        handleClose()
      } else {
        handleShowAlert()
      }
    })
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
            <h2 className='text-center text-color'>Eliminar articulo</h2>
            <form onSubmit={EliminarArticulo}>
              <div className='mb-3'>
                <label className='form-label mt-2 text-color'>
                  Nombre del articulo
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  id='nombre'
                  placeholder='Nombre etiqueta'
                  disabled
                />
                <div id='errEmail' style={{ display: 'none', color: 'red' }}>
                  *Debes introducir un nombre válido para la etiqueta
                </div>
              </div>
              <div>
                <label className='form-label mt-2 text-color'>
                  Selecciona etiqueta
                </label>
                <label className='form-label mt-2 text-color'>Enlace</label>
                <input
                  type='text'
                  className='form-control'
                  value={etiquetaSeleccionada}
                  onChange={e => setEnlace(e.target.value)}
                  id='Etiqueta'
                  placeholder='Etiqueta'
                  disabled
                />
                <div id='errSelect' style={{ display: 'none', color: 'red' }}>
                  *Introduce una descripcion adecuada
                </div>
              </div>
              <div className='mb-3'>
                <label className='form-label mt-2 text-color'>Enlace</label>
                <input
                  type='text'
                  className='form-control'
                  value={enlace}
                  onChange={e => setEnlace(e.target.value)}
                  id='enlace'
                  placeholder='Enlace'
                  disabled
                />
                <div id='errEnlace' style={{ display: 'none', color: 'red' }}>
                  *Debes introducir un enlace válido
                </div>
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label text-color'>
                  Descripcion
                </label>
                <textarea
                  className='form-control'
                  value={descripcion}
                  placeholder='Escribe una descripción'
                  id='descripcion'
                  onChange={e => setDescripcion(e.target.value)}
                  disabled
                ></textarea>
                <div id='errCuenta' style={{ display: 'none', color: 'red' }}>
                  *Introduce una descripcion adecuada
                </div>
              </div>
              <button type='submit' className='btn btn-success w-100 mt-3'>
                Eliminar articulo
              </button>
              <a href='/etiquetas' className='btn btn-danger w-100 mt-3' role='button'>
                Cancelar
              </a>
            </form>
          </div>
          <ComponenteModal show={show} handleClose={handleClose} msg="Tenemos problemas para contactar con el servidor, intentalo más tarde" />
        </div>
      )}
    </>
  )
}

export default EliminarArticulo
