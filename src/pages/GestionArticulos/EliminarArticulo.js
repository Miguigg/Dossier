import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'

import '../../css/landing.css'
import '../../css/login.css'

function EliminarArticulo () {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')

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

  const EliminarArticulo = e => {}

  //recuperar datos del objeto a eliminar
  useEffect(() => {
    return () => {}
  }, [])

  return (
    <>
      {usuarioAutenticado === null ? (
        <div className='p-5'>
          <h1>Debes tener la sesión iniciada</h1>
        </div>
      ) : (
        <div className='container'>
          <div className='login-container gradient-bg-landing'>
            <h2 className='text-center text-color'>Eliminar articulo</h2>
            <form onSubmit={EliminarArticulo}>
              <div className='mb-3'>
                <label className='form-label mt-2 text-color'>
                  Nombre del articulo
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  id='nombre'
                  placeholder='Nombre etiqueta'
                  disabled
                />
                <div id='errEmail' style={{ display: 'none', color: 'red' }}>
                  *Debes introducir un nombre válido para la etiqueta
                </div>
              </div>
              <div>
                <label className='form-label mt-2 text-color'>
                  Selecciona etiqueta
                </label>
                <select
                  className='form-select form-select mb-3'
                  aria-label='Large select example'
                  disabled
                >
                  <option value='0' selected>
                    selecciona etiqueta
                  </option>
                  <option value='1'>One</option>
                  <option value='2'>Two</option>
                  <option value='3'>Three</option>
                </select>
                <div id='errSelect' style={{ display: 'none', color: 'red' }}>
                  *Introduce una descripcion adecuada
                </div>
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label text-color'>
                  Descripcion
                </label>
                <textarea
                  className='form-control'
                  value={descripcion}
                  placeholder='Escribe una descripción'
                  id='descripcion'
                  onChange={e => setDescripcion(e.target.value)}
                  disabled
                ></textarea>
                <div id='errCuenta' style={{ display: 'none', color: 'red' }}>
                  *Introduce una descripcion adecuada
                </div>
              </div>
              <button type='submit' className='btn btn-success w-100 mt-3'>
                Eliminar articulo
              </button>
              <a href='/home' className='btn btn-danger w-100 mt-3' role='button'>
                Cancelar
              </a>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default EliminarArticulo
