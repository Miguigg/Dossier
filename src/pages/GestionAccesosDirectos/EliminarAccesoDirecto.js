import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { auth } from '../../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc , deleteDoc } from "firebase/firestore";
import exportFuncionesCuenta from '../../utils/firebase';

import '../../css/landing.css'
import '../../css/login.css'


function EliminarAccesoDirecto() {
    const [usuarioAutenticado, setUsuarioAutenticado] = useState("");
    const location = useLocation();
    const data = location.state;

    const navigate = useNavigate();
 
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

    const handleRedirect = () => {
      navigate('/cuenta-usr');
    };

    const EliminarAccesoDirecto = async (e) => {
      e.preventDefault()
      await deleteDoc(doc(exportFuncionesCuenta.db, "Accesos-directos", data.idAcceso));
      handleRedirect()
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
          <h2 className="text-center text-color">Eliminar acceso directo</h2>
          <form onSubmit={EliminarAccesoDirecto}>
            <div className="mb-3">
              <label className="form-label mt-2 text-color">Nombre del acceso directo</label>
              <input type="text" className="form-control" value={data.nombre} id="nombre" placeholder="Nombre" disabled/>
              <div id="errEmail" style={{display: "none", color: "red"}}>
              *Debes introducir un nombre válido para el articulo
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label mt-2 text-color">Enlace del acceso directo</label>
              <input type="text" className="form-control" value={data.enlace} id="nombre" placeholder="Enlace" disabled/>
              <div id="errEmail" style={{display: "none", color: "red"}}>
              *Debes introducir un enlace válido
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100 mt-3">Eliminar acceso directo</button>
            <a href="/home" className="btn btn-danger w-100 mt-3" role="button">Cancelar</a>
          </form>
        </div>
      </div>
      )}
      </>
    );
  }
  
  export default EliminarAccesoDirecto;