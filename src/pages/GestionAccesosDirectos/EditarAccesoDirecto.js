import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from '../../utils/firebase'
import exportFuncionesCuenta from '../../utils/firebase';
import { doc, updateDoc } from "firebase/firestore";

import '../../css/landing.css'
import '../../css/login.css'
import validarAccesoDirecto from '../../utils/validadores/validarAccesoDirecto';


function EditarAccesoDirecto() {
  
    const [usuarioAutenticado, setUsuarioAutenticado] = useState("");
    const [nombre, setNombre] = useState('');
    const [enlace, setEnlace] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    useEffect(() => {
      setNombre(data.nombre)
      setEnlace(data.enlace)
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

    const handleRedirect = () => {
      navigate('/cuenta-usr');
    };

    const EditarAccesoDirecto = async (e) => {
      e.preventDefault();
      if(validarAccesoDirecto(nombre, enlace)){
        const docRef = doc(exportFuncionesCuenta.db, "Accesos-directos", data.idAcceso);
        await updateDoc(docRef, {
          nombre: nombre,
          enlace: enlace
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
            <h2 className="text-center text-color">Editar acceso directo</h2>
            <form onSubmit={EditarAccesoDirecto}>
              <div className="mb-3">
                <label className="form-label mt-2 text-color">Nombre del acceso directo</label>
                <input type="text" className="form-control" value={nombre} onChange={(e)=> setNombre(e.target.value)} id="nombre" placeholder="Nombre" />
                <div id="errNombre" style={{display: "none", color: "red"}}>
                *Debes introducir un nombre válido para el acceso directo
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label mt-2 text-color">Enlace del acceso directo</label>
                <input type="text" className="form-control" value={enlace} onChange={(e)=> setEnlace(e.target.value)} id="enlace" placeholder="Enlace" />
                <div id="errEnlace" style={{display: "none", color: "red"}}>
                *Debes introducir un enlace válido
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100 mt-3">Editar acceso directo</button>
              <a href="/home" className="btn btn-danger w-100 mt-3" role="button">Cancelar</a>
            </form>
          </div>
        </div>
        )}
      </>
    );
  }
  
  export default EditarAccesoDirecto;