import React, { useEffect, useState } from 'react';


import '../../css/landing.css'
import '../../css/login.css'


function  EliminarEtiqueta() {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const eliminarEtiqueta = (e) => {}
    
    //para recuperar los datos de la etiqueta a eliminar
    useEffect(() =>{

      return () => {
      }
  }, [])

    return (
        <div className="container">
        <div className="login-container gradient-bg-landing">
          <h2 className="text-center text-color">Eliminar etiqueta</h2>
          <form onSubmit={eliminarEtiqueta}>
            <div className="mb-3">
              <label className="form-label mt-2 text-color">Nombre Etiqueta</label>
              <input type="text" className="form-control" value={nombre} onChange={(e)=> setNombre(e.target.value)} id="nombre" placeholder="Nombre etiqueta" disabled/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-color">Descripcion</label>
              <textarea class="form-control" value={descripcion} placeholder="Escribe una descripción" id="descripcion"  onChange={(e)=> setDescripcion(e.target.value)} disabled></textarea>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3">Eliminar etiqueta</button>
            <a href="/home" class="btn btn-danger w-100 mt-3" role="button">Cancelar</a>
          </form>
        </div>
      </div>
    );
  }
  
  export default EliminarEtiqueta;