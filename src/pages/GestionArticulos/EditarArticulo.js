import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { collection, query, where, getDocs , doc, updateDoc } from 'firebase/firestore'
import validarArticulo from '../../utils/validadores/validadorArticulo'
import exportFuncionesCuenta from '../../utils/firebase'
import ComponenteModal from '../../components/ComponenteModal'

import '../../css/landing.css'
import '../../css/login.css'

function EditArticulo () {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [listaEtiquetas, setListaEtiquetas] = useState('')
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState('')
  const [enlace, setEnlace] = useState('');

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  const location = useLocation();

  const data = location.state;

  let handleEtiquetaChange = (e) => {
    setEtiquetaSeleccionada(e.target.value)
  }

  const handleRedirect = () => {
    navigate('/etiquetas')
  }

  const handleShowAlert = () => {
    handleShow()
  };

  const handleClose = () => {
    setShow(false)
  };

  const EditarArticulo = async (e) => {
    e.preventDefault()

    if (validarArticulo(nombre,enlace,etiquetaSeleccionada,descripcion)) {
      const docRef = doc(exportFuncionesCuenta.db, "Articulos", data.idArticulo);
      await updateDoc(docRef, {
        nombre: nombre,
        enlace: enlace,
        descripcion: descripcion,
        idEtiqueta: etiquetaSeleccionada
      });
      handleRedirect()
    }
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

    //Para el select
    function getDocsEtiquetas () {
      onAuthStateChanged(auth, async user => {
        if (user) {
          let tmpLista = []
          const uid = user.uid
          const q = query(
            collection(exportFuncionesCuenta.db, 'Etiquetas'),
            where('idUsuario', '==', uid)
          )
  
          const querySnapshot = await getDocs(q)
          querySnapshot.forEach(doc => {
            tmpLista.push(doc.data())
          })
          setListaEtiquetas(tmpLista)
          handleClose()
        } else {
          handleShowAlert()
        }
      })
    }

  //recuperar datos del objeto a modificar
  useEffect(() => {
    setNombre(data.nombre)
    setDescripcion(data.descripcion)
    setEnlace(data.enlace)
    getDocsEtiquetas()
  }, [])

  const hasValues = obj => Object.keys(obj).length > 0;

  return (
    <>
      {usuarioAutenticado === null ? (
        <div className='p-5'>
          <h1>Debes tener la sesión iniciada</h1>
        </div>
      ) : (
        <div className='container'>
          <div className='login-container gradient-bg-landing'>
            <h2 className='text-center text-color'>Editar articulo</h2>
            <form onSubmit={EditarArticulo}>
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
                />
                <div id='errNombre' style={{ display: 'none', color: 'red' }}>
                  *Debes introducir un nombre válido para la etiqueta
                </div>
              </div>
              <div>
                  <label className="form-label mt-2 text-color">Selecciona etiqueta</label>
                  {hasValues(listaEtiquetas) ? (
                  <select id="selectEtc" className="form-select form-select mb-3" onChange={handleEtiquetaChange}> 
                    <option value="0"> -- Selecciona una etiqueta -- </option>  
                    {listaEtiquetas.map((et) => <option value={et.idEtiqueta}>{et.nombre}</option>)}
                  </select>
                  ) : (
                    <div id="errSelect" style={{display: "block", color: "red"}}>
                    *No tienes etiquetas disponibles
                    </div>
                  )}
                  <div id="errSelect" style={{display: "none", color: "red"}}>
                  *Selecciona una etiqueta correcta
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
                ></textarea>
                <div
                  id='errDescripcion'
                  style={{ display: 'none', color: 'red' }}
                >
                  *Introduce una descripcion adecuada
                </div>
              </div>
              <button type='submit' className='btn btn-success w-100 mt-3'>
                Editar articulo
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

export default EditArticulo
