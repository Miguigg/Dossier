import React, { useState } from 'react';


import '../../css/landing.css'
import '../../css/login.css'


function AddArticulo() {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const AñadirArticulo = (e) => {}

    return (
        <div className="container">
        <div className="login-container gradient-bg-landing">
          <h2 className="text-center text-color">Añadir articulo a una etiqueta</h2>
          <form onSubmit={AñadirArticulo}>
            <div className="mb-3">
              <label className="form-label mt-2 text-color">Nombre del articulo</label>
              <input type="text" className="form-control" value={nombre} onChange={(e)=> setNombre(e.target.value)} id="nombre" placeholder="Nombre etiqueta" />
              <div id="errEmail" style={{display: "none", color: "red"}}>
              *Debes introducir un nombre válido para la etiqueta
              </div>
            </div>
            <div>
                <label className="form-label mt-2 text-color">Selecciona etiqueta</label>
                <select class="form-select form-select mb-3" aria-label="Large select example">
                    <option value="0" selected>selecciona etiqueta</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <div id="errSelect" style={{display: "none", color: "red"}}>
              *Introduce una descripcion adecuada
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-color">Descripcion</label>
              <textarea class="form-control" value={descripcion} placeholder="Escribe una descripción" id="descripcion"  onChange={(e)=> setDescripcion(e.target.value)}></textarea>
              <div id="errCuenta" style={{display: "none", color: "red"}}>
              *Introduce una descripcion adecuada
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3">Añadir articulo</button>
            <a href="/home" class="btn btn-danger w-100 mt-3" role="button">Cancelar</a>
          </form>
        </div>
      </div>
    );
  }
  
  export default AddArticulo;