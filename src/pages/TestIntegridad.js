import React, { useState } from 'react'
import validarEnlaceNoticia from '../utils/validarEnlaceNoticia'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'

function TestIntegridad () {
  const [enlace, setEnlace] = useState('')
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('')

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

  const ejecutarTest = e => {
    e.preventDefault()
    if (validarEnlaceNoticia(enlace)) {
      console.log('aaaaa')
    }
  }

  return (
    <>
      {usuarioAutenticado === null ? (
        <div className='p-5'>
          <h1>Debes tener la sesión iniciada</h1>
        </div>
      ) : (
        <div class='container my-5'>
          <h1 class='mb-4'>Test de Integridad</h1>
          <div className='container'>
            <section className='text-black py-5 ms-5 me-5 p-auto rounded-4 gradient-bg-landing'>
              <div className='container'>
                <form onSubmit={ejecutarTest}>
                  <h2 className='text-center text-color p-5'>
                    Introduce aquí el enlace
                  </h2>
                  <input
                    type='text'
                    className='form-control'
                    id='enlace'
                    value={enlace}
                    onChange={e => setEnlace(e.target.value)}
                    placeholder='Enlace'
                  />
                  <div className='p-5'>
                    <button class='btn btn-success btn-lg'>
                      Inspeccionar articulo
                    </button>
                  </div>
                </form>
                <div id='errEnlace' style={{ display: 'none', color: 'red' }}>
                  *Debes introducir un enlace válido
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  )
}

export default TestIntegridad
