import { useState } from "react";
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils/firebase'

function EliminarCuenta(){

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
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

    const eliminarCuenta = (e) => {}

    return(
        <>
            {usuarioAutenticado === null ? (
            <div className='p-5'>
            <h1>Debes tener la sesión iniciada</h1>
            </div>
        ) : (
            <div className="container">
                <div className="login-container gradient-bg-landing">
                    <h2 className="text-center text-color">Eliminar cuenta</h2>
                    <form onSubmit={eliminarCuenta}>
                        <div>
                            <div className="mb-3 mt-2">
                                <label className="form-label text-color">Nombre</label>
                                <input className="form-control" id="nombre" placeholder="Nombre" value={nombre} onChange={(e)=> setNombre(e.target.value)} disabled/>
                            </div>
                            <div className="mb-3 mt-2">
                                <label className="form-label text-color">Apellidos</label>
                                <input className="form-control" id="apellidos" placeholder="Apellidos" value={apellidos} onChange={(e)=> setApellidos(e.target.value)} disabled/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label mt-2 text-color">Dirección de correo</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your email" value={correo} onChange={(e)=> setCorreo(e.target.value)} disabled/>
                            </div>
                            <button type="button" className="btn btn-success w-100 mt-3">Eliminar usuario</button>
                            <a href="/home" className="btn btn-danger w-100 mt-3" role="button">Cancelar</a>
                        </div>
                    </form>
                </div>
            </div>
        )}
        </>
    );
}

export default EliminarCuenta;