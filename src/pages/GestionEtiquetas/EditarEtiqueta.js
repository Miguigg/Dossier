import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useLocation, useNavigate } from 'react-router-dom';
import validacionEtiqueta from '../../utils/validadores/validacionEtiqueta';
import { doc, updateDoc } from "firebase/firestore";
import exportFuncionesCuenta from '../../utils/firebase';

import '../../css/landing.css'
import '../../css/login.css'


function EditarEtiqueta() {

    const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const location = useLocation();
    const navigate = useNavigate()

    const handleRedirect = () => {
      navigate('/cuenta-usr')
    }

    const data = location.state;

    useEffect(() => {
      setNombre(data.nombre)
      setDescripcion(data.descripcion)
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

    const EditarEtiqueta = async (e) => {
      e.preventDefault()
      if(validacionEtiqueta){
        const docRef = doc(exportFuncionesCuenta.db, "Etiquetas", data.idEtiqueta);
        await updateDoc(docRef, {
          nombre: nombre,
          descripcion: descripcion
        });
        handleRedirect()
      }
    }

    return (
      <>
        {usuarioAutenticado === null ? (
            <div className='p-5'>
            <h1>Debes tener la sesión iniciada</h1>
            </div>
        ) : (
          <div className="container">
          <div className="login-container gradient-bg-landing">
            <h2 className="text-center text-color">Editar etiqueta</h2>
            <form onSubmit={EditarEtiqueta}>
              <div className="mb-3">
                <label className="form-label mt-2 text-color">Nombre Etiqueta</label>
                <input type="text" className="form-control" value={nombre} onChange={(e)=> setNombre(e.target.value)} id="nombre" placeholder="Nombre etiqueta" />
                <div id="errNombreFormato" style={{display: "none", color: "red"}}>
                *Debes introducir un nombre válido para la etiqueta
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-color">Descripcion</label>
                <textarea className="form-control" value={descripcion} placeholder="Escribe una descripción" id="descripcion"  onChange={(e)=> setDescripcion(e.target.value)}></textarea>
                <div id="errDescripcion" style={{display: "none", color: "red"}}>
                *Introduce una descripcion adecuada
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100 mt-3">Editar etiqueta</button>
              <a href="/cuenta-usr" className="btn btn-danger w-100 mt-3" role="button">Cancelar</a>
            </form>
          </div>
        </div>
        )}
      </>
    );
  }
  
  export default EditarEtiqueta;