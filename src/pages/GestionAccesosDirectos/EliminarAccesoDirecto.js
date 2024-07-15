import React, { useState } from 'react';


import '../../css/landing.css'
import '../../css/login.css'


function EliminarAccesoDirecto() {

    const [nombre, setNombre] = useState('');
    const [enlace, setEnlace] = useState('');

    const EliminarAccesoDirecto = (e) => {}

    return (
        <div className="container">
        <div className="login-container gradient-bg-landing">
          <h2 className="text-center text-color">Eliminar acceso directo</h2>
          <form onSubmit={EliminarAccesoDirecto}>
            <div className="mb-3">
              <label className="form-label mt-2 text-color">Nombre del acceso directo</label>
              <input type="text" className="form-control" value={nombre} onChange={(e)=> setNombre(e.target.value)} id="nombre" placeholder="Nombre" disabled/>
              <div id="errEmail" style={{display: "none", color: "red"}}>
              *Debes introducir un nombre válido para el articulo
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label mt-2 text-color">Enlace del acceso directo</label>
              <input type="text" className="form-control" value={enlace} onChange={(e)=> setEnlace(e.target.value)} id="nombre" placeholder="Enlace" disabled/>
              <div id="errEmail" style={{display: "none", color: "red"}}>
              *Debes introducir un enlace válido
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100 mt-3">Eliminar acceso directo</button>
            <a href="/home" class="btn btn-danger w-100 mt-3" role="button">Cancelar</a>
          </form>
        </div>
      </div>
    );
  }
  
  export default EliminarAccesoDirecto;