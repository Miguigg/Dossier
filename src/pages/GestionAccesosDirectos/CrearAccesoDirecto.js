import React, { useState } from 'react';


import '../../css/landing.css'
import '../../css/login.css'


function AddAccesoDirecto() {

    const [nombre, setNombre] = useState('');
    const [enlace, setEnlace] = useState('');

    const AñadirAccesoDirecto = (e) => {}

    return (
        <div className="container">
        <div className="login-container gradient-bg-landing">
          <h2 className="text-center text-color">Añadir acceso directo</h2>
          <form onSubmit={AñadirAccesoDirecto}>
            <div className="mb-3">
              <label className="form-label mt-2 text-color">Nombre del articulo</label>
              <input type="text" className="form-control" value={nombre} onChange={(e)=> setNombre(e.target.value)} id="nombre" placeholder="Nombre etiqueta" />
              <div id="errEmail" style={{display: "none", color: "red"}}>
              *Debes introducir un nombre válido para el articulo
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label mt-2 text-color">Enlace del articulo</label>
              <input type="text" className="form-control" value={enlace} onChange={(e)=> setEnlace(e.target.value)} id="nombre" placeholder="Enlace articulo" />
              <div id="errEmail" style={{display: "none", color: "red"}}>
              *Debes introducir un enlace válido
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100 mt-3">Añadir acceso directo</button>
            <a href="/home" class="btn btn-danger w-100 mt-3" role="button">Cancelar</a>
          </form>
        </div>
      </div>
    );
  }
  
  export default AddAccesoDirecto;