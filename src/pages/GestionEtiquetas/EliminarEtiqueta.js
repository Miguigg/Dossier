import React, { useState } from 'react';


import '../../css/landing.css'
import '../../css/login.css'


function  EliminarEtiqueta() {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const eliminarEtiqueta = (e) => {}
    
    return (
        <div className="container">
        <div className="login-container gradient-bg-landing">
          <h2 className="text-center text-color">Crear nueva etiqueta</h2>
          <form onSubmit={eliminarEtiqueta}>
            <div className="mb-3">
              <label className="form-label mt-2 text-color">Nombre Etiqueta</label>
              <input type="text" className="form-control" value={nombre} onChange={(e)=> setNombre(e.target.value)} id="nombre" placeholder="Nombre etiqueta" disabled/>
              <div id="errEmail" style={{display: "none", color: "red"}}>
              *Debes introducir un nombre válido para la etiqueta
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-color">Descripcion</label>
              <textarea class="form-control" value={descripcion} placeholder="Escribe una descripción" id="descripcion"  onChange={(e)=> setDescripcion(e.target.value)} disabled></textarea>
              <div id="errCuenta" style={{display: "none", color: "red"}}>
              *Introduce una descripcion adecuada
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3">Eliminar etiqueta</button>
            <button type="button" class="btn btn-danger w-100 mt-3">Cancelar</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default EliminarEtiqueta;