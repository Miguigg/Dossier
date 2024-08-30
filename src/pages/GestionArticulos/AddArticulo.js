import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { collection, query, where, getDocs , doc,  addDoc, updateDoc } from 'firebase/firestore'
import ComponenteModal from '../../components/ComponenteModal';

import exportFuncionesCuenta from '../../utils/firebase';
import validarArticulo from '../../utils/validadores/validadorArticulo';
import '../../css/landing.css'
import '../../css/login.css'


function AddArticulo() {
    const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
    const [nombre, setNombre] = useState('');
    const [enlace, setEnlace] = useState('');
    const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState('')
    const [descripcion, setDescripcion] = useState('');

    const [listaEtiquetas, setListaEtiquetas] = useState('')
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    let handleEtiquetaChange = (e) => {
      setEtiquetaSeleccionada(e.target.value)
    }

    const handleShowAlert = () => {
      handleShow()
    };
  
    const handleClose = () => {
      setShow(false)
    };
  

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

    const navigate = useNavigate()

    const handleRedirect = () => {
      navigate('/etiquetas')
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

    useEffect(() => {
      onAuthStateChanged(auth, user => {
        if (user) {
          getDocsEtiquetas()
          handleClose()
        } else {
          handleShowAlert()
        }
      })
    }, [])
    

    const AñadirArticulo = (e) => {
      e.preventDefault();
      if(validarArticulo(nombre, enlace,etiquetaSeleccionada,descripcion)){
        onAuthStateChanged(auth, async user => {
          if (user) {
            const uid = user.uid
            try {
              const docRef = await addDoc(
                collection(exportFuncionesCuenta.db, 'Articulos'),
                {
                  nombre: nombre,
                  enlace: enlace,
                  idUsuario: uid,
                  descripcion: descripcion,
                  idEtiqueta: etiquetaSeleccionada
                }
              )
              const etRef = doc(exportFuncionesCuenta.db, "Articulos", docRef.id);
              await updateDoc(etRef, {
                idArticulo: docRef.id
              })
              handleClose()
              handleRedirect()
            } catch (e) {
              handleRedirect()
            }
          } else {
            handleRedirect()
          }
        })
      }
      }

    const hasValues = obj => Object.keys(obj).length > 0;


    return (
      <>
            {usuarioAutenticado === null ? (
        <div className='p-5'>
          <h1>Debes tener la sesión iniciada</h1>
        </div>
      ) : (
          <div className="container">
          <div className="login-container gradient-bg-landing">
            <h2 className="text-center text-color">Añadir articulo a una etiqueta</h2>
            <form onSubmit={AñadirArticulo}>
              <div className="mb-3">
                <label className="form-label mt-2 text-color">Nombre del articulo</label>
                <input type="text" className="form-control" value={nombre} onChange={(e)=> setNombre(e.target.value)} id="nombre" placeholder="Nombre etiqueta" />
                <div id="errNombre" style={{display: "none", color: "red"}}>
                *Debes introducir un nombre válido para el articulo
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
              <div className="mb-3">
                <label className="form-label text-color">Descripcion</label>
                <textarea className="form-control" value={descripcion} placeholder="Escribe una descripción" id="descripcion"  onChange={(e)=> setDescripcion(e.target.value)}></textarea>
                <div id="errDescripcion" style={{display: "none", color: "red"}}>
                *Introduce una descripcion adecuada
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100 mt-3">Añadir articulo</button>
              <a href="/etiquetas" className="btn btn-danger w-100 mt-3" role="button">Cancelar</a>
            </form>
          </div>
          <ComponenteModal show={show} handleClose={handleClose} msg="Tenemos problemas para contactar con el servidor, intentalo más tarde" />
        </div>
      )}
      </>
    );
  }
  
  export default AddArticulo;