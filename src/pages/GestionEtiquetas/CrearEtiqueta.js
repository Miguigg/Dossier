import React, { useState } from 'react';
import validacionEtiqueta from '../../utils/validadores/validacionEtiqueta';
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'

import '../../css/landing.css'
import '../../css/login.css'


function CrearEtiqueta() {
    const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

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

    const crearEtiqueta = (e) => {
        if(validacionEtiqueta){
          console.log("aaaa")
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
            <h2 className="text-center text-color">Crear nueva etiqueta</h2>
            <form onSubmit={crearEtiqueta}>
              <div className="mb-3">
                <label className="form-label mt-2 text-color">Nombre Etiqueta</label>
                <input type="text" className="form-control" value={nombre} onChange={(e)=> setNombre(e.target.value)} id="nombre" placeholder="Nombre etiqueta" />
                <div id="errNombreFormato" style={{display: "none", color: "red"}}>
                *Debes introducir un nombre válido para la etiqueta
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-color">Descripcion</label>
                <textarea class="form-control" value={descripcion} placeholder="Escribe una descripción" id="descripcion"  onChange={(e)=> setDescripcion(e.target.value)}></textarea>
                <div id="errDescripcion" style={{display: "none", color: "red"}}>
                *Introduce una descripcion adecuada
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100 mt-3">Crear etiqueta</button>
              <a href="/home" class="btn btn-danger w-100 mt-3" role="button">Cancelar</a>
            </form>
          </div>
        </div>
        )}
      </>
    );
  }
  
  export default CrearEtiqueta;